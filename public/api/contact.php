<?php
/**
 * Contact endpoint for The BizChemists site.
 *
 * Accepts JSON POST from the site's forms, validates it, and emails the enquiry.
 * Returns JSON so the front end can show a real success/failure state.
 *
 * Deployment: needs a host that executes PHP. The shipped Dockerfile builds exactly
 * that (php:8.3-apache with msmtp relaying through SMTP), which is what Coolify runs.
 * On a purely static host the front end falls back to a prefilled mailto, so the form
 * is never a dead end — but it converts far worse, so prefer the container.
 */

declare(strict_types=1);

// ---------------------------------------------------------------- config
// Overridable so the address is not pinned inside the image.
define('TO_ADDRESS', getenv('CONTACT_TO') ?: 'bizchemistsfounder@gmail.com');
// The address the mail is From. Never derived from the request: Host is attacker
// controlled, and letting it choose the From domain invites spoofing and wrecks SPF.
//
// Some relays refuse to send as an address they do not own — Gmail rewrites anything
// that is not the authenticated account — so this takes a full address, falling back
// to no-reply@<domain> when only a domain is given.
define('FROM_ADDRESS', getenv('CONTACT_FROM')
    ?: 'no-reply@' . (getenv('CONTACT_FROM_DOMAIN') ?: 'bizchemists.com'));

const SITE_NAME   = 'The BizChemists';
const MAX_LEN     = ['name' => 120, 'email' => 190, 'company' => 160, 'service' => 120, 'message' => 5000];
const MIN_SECONDS = 3;    // a human takes at least this long to fill the form
const RATE_MAX    = 5;    // submissions per IP...
const RATE_WINDOW = 600;  // ...per this many seconds

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function fail(string $message, int $status = 400): never {
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

function succeed(): never {
    echo json_encode(['ok' => true], JSON_UNESCAPED_SLASHES);
    exit;
}

/** Strip anything that could break out of a mail header into a new header. */
function headerSafe(string $value): string {
    return trim(str_replace(["\r", "\n", "%0a", "%0d", "\0"], ' ', $value));
}

/** A display name sits between the header name and an <address>; keep it plain. */
function displayName(string $value): string {
    return trim(str_replace(['<', '>', '"', ',', ';', ':'], ' ', headerSafe($value)));
}

/**
 * Behind Coolify the request arrives through Traefik, so REMOTE_ADDR is the proxy.
 * The proxy appends the address it actually saw to X-Forwarded-For, which makes the
 * LAST entry the trustworthy one — a client can forge earlier entries but cannot stop
 * the proxy appending the truth after them.
 */
function clientIp(): string {
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($forwarded !== '') {
        $parts = array_map('trim', explode(',', $forwarded));
        $last  = end($parts);
        if (filter_var($last, FILTER_VALIDATE_IP)) {
            return $last;
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/** Sliding-window throttle. Without it this endpoint is a free mail relay. */
function throttled(string $ip): bool {
    $file = sys_get_temp_dir() . '/bizc-rate-' . hash('sha256', $ip) . '.json';
    $now  = time();

    $hits = [];
    if (is_readable($file)) {
        $decoded = json_decode((string) file_get_contents($file), true);
        if (is_array($decoded)) {
            $hits = array_filter($decoded, static fn($t) => is_int($t) && $t > $now - RATE_WINDOW);
        }
    }

    if (count($hits) >= RATE_MAX) {
        return true;
    }

    $hits[] = $now;
    @file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
    return false;
}

// ---------------------------------------------------------------- method
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail('Use POST.', 405);
}

// Same-origin only. A missing Origin (same-origin fetch in some browsers) is allowed.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $originHost = parse_url($origin, PHP_URL_HOST) ?: '';
    if ($host === '' || strcasecmp($originHost, (string) parse_url('http://' . $host, PHP_URL_HOST)) !== 0) {
        fail('Cross-origin requests are not accepted.', 403);
    }
}

if (throttled(clientIp())) {
    fail('Too many messages from this connection. Please try again shortly.', 429);
}

// ---------------------------------------------------------------- input
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    fail('Request body missing or too large.');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail('Expected a JSON body.');
}

$field = static function (string $key) use ($data): string {
    $value = $data[$key] ?? '';
    return is_string($value) ? trim($value) : '';
};

// Bots fill hidden fields; humans do not.
if ($field('website') !== '') {
    succeed(); // answer normally so the bot learns nothing
}

// Bots also submit instantly.
$elapsed = isset($data['elapsed']) && is_numeric($data['elapsed']) ? (float) $data['elapsed'] : null;
if ($elapsed !== null && $elapsed < MIN_SECONDS) {
    succeed();
}

$name    = $field('name');
$email   = $field('email');
$company = $field('company');
$service = $field('service');
$message = $field('message');

if ($name === '')    fail('Please tell us your name.');
if ($message === '') fail('Please add a short message.');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('That email address does not look right.');
}

$lengths = ['name' => $name, 'email' => $email, 'company' => $company, 'service' => $service, 'message' => $message];
foreach (MAX_LEN as $key => $limit) {
    if (mb_strlen($lengths[$key]) > $limit) {
        fail(ucfirst($key) . ' is too long.');
    }
}

// ---------------------------------------------------------------- send
$safeName    = displayName($name);
$safeEmail   = headerSafe($email);
$safeService = headerSafe($service);

$subject = $safeService !== ''
    ? sprintf('[%s] %s — %s', SITE_NAME, $safeService, $safeName)
    : sprintf('[%s] Enquiry — %s', SITE_NAME, $safeName);

$body = implode("\n", [
    'Name:    ' . $name,
    'Email:   ' . $email,
    'Company: ' . ($company !== '' ? $company : '—'),
    'Service: ' . ($service !== '' ? $service : '—'),
    '',
    'Message:',
    $message,
    '',
    '---',
    'Sent from ' . SITE_NAME . ' at ' . gmdate('c') . ' UTC',
]);

$headers = implode("\r\n", [
    'From: ' . SITE_NAME . ' <' . FROM_ADDRESS . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
]);

if (!@mail(TO_ADDRESS, headerSafe($subject), $body, $headers)) {
    error_log('[bizchemists] mail() failed — check the msmtp relay configuration');
    fail('The message could not be sent. Please email us directly.', 502);
}

succeed();
