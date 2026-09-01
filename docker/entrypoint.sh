#!/bin/sh
set -eu

# Renders the msmtp relay config from environment variables at start-up, so no SMTP
# credential is ever baked into the image or committed to the repository. Coolify
# injects these as secrets.
#
# Without SMTP_HOST the site still serves perfectly — only the contact form degrades,
# and the front end already falls back to a prefilled mailto when the endpoint fails.

if [ -n "${SMTP_HOST:-}" ]; then
  : "${SMTP_PORT:=587}"
  : "${SMTP_FROM:=no-reply@bizchemists.com}"
  : "${SMTP_TLS:=on}"

  {
    echo "defaults"
    echo "auth           on"
    echo "tls            ${SMTP_TLS}"
    echo "tls_starttls   on"
    echo "tls_trust_file /etc/ssl/certs/ca-certificates.crt"
    echo "logfile        /dev/stderr"
    echo ""
    echo "account        default"
    echo "host           ${SMTP_HOST}"
    echo "port           ${SMTP_PORT}"
    echo "from           ${SMTP_FROM}"
    echo "user           ${SMTP_USER:-}"
    echo "password       ${SMTP_PASS:-}"
  } > /etc/msmtprc

  # Contains a password: readable only by the web user that needs it.
  chown root:www-data /etc/msmtprc
  chmod 640 /etc/msmtprc
  echo "[entrypoint] mail relay configured for ${SMTP_HOST}:${SMTP_PORT}"
else
  echo "[entrypoint] WARNING: SMTP_HOST is unset — the contact form cannot send mail."
  echo "[entrypoint] The site will serve normally and the form falls back to mailto."
fi

exec "$@"
