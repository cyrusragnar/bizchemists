/** One display-type scale, shared by every section heading. */
export const DISPLAY = {
  fontSize: 'clamp(2rem, 6vw, 5rem)',
  lineHeight: 0.92,
  fontWeight: 600,
  letterSpacing: '-0.02em',
}

/**
 * The real mark is a 500px square with the "b" sitting in roughly the middle third
 * and decorative chevrons out at the corners. We crop to the mark: scale it up inside
 * a round window so the nav gets the logo, not the logo's whitespace.
 */
export function Logo({ withWordmark = false, size = 'h-9 w-9', dark = false }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`relative block shrink-0 overflow-hidden rounded-full ${size}`}>
        <img
          src="/brand/logo.png"
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[260%] w-[260%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </span>
      {withWordmark && (
        <span
          className={`hidden text-sm font-semibold uppercase tracking-[0.2em] lg:inline ${
            dark ? 'text-ink' : 'text-white'
          }`}
        >
          BizChemists
        </span>
      )}
    </span>
  )
}

/** Section shell: consistent rhythm and horizontal gutters across the page. */
export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`px-5 py-24 sm:px-8 md:px-12 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  )
}
