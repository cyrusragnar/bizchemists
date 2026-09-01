import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * The one modal shell on the site: case studies and service details both use it.
 *
 * Rendered through a portal to <body>. Mounted in place it inherits whatever stacking
 * context its section sits in — the services block is `relative z-10`, which trapped
 * the panel *below* the z-40 nav no matter how high its own z-index went.
 * Stays mounted so it leaves the way it arrived; `inert` keeps it out of the tab
 * order while closed, and Tab is trapped inside while it is open.
 */
export default function Panel({ open, onClose, label, eyebrow = 'Detail', returnFocusTo, children }) {
  const panel = useRef(null)
  const closeBtn = useRef(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    panel.current?.scrollTo(0, 0)

    /* The panel transitions out of `visibility: hidden`, and a hidden element cannot
       take focus — focusing too early silently fails and leaves focus on the trigger
       behind the overlay. Try now, then confirm once the transition has committed. */
    closeBtn.current?.focus()
    const settle = setTimeout(() => {
      if (!panel.current?.contains(document.activeElement)) closeBtn.current?.focus()
    }, 120)

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      // aria-modal alone does not stop Tab reaching the page underneath
      const focusables = panel.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!panel.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(settle)
      window.removeEventListener('keydown', onKey)
      returnFocusTo?.current?.focus?.()
    }
  }, [open, onClose, returnFocusTo])

  return createPortal(
    <div
      {...(open ? {} : { inert: '' })}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      ref={panel}
      /* Lenis hijacks wheel events for the whole document; without this opt-out the
         panel could only be moved by dragging its scrollbar. */
      data-lenis-prevent
      className={`fixed inset-0 z-[70] overflow-y-auto bg-ink transition-[opacity,transform,visibility] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-4 opacity-0'
      }`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-ink/85 px-5 py-4 backdrop-blur-md sm:px-8 md:px-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
        <button
          ref={closeBtn}
          onClick={onClose}
          aria-label={`Close ${eyebrow.toLowerCase()}`}
          className="press flex h-9 w-9 items-center justify-center rounded-full bg-accent"
        >
          <X className="h-4 w-4 text-ink" />
        </button>
      </div>
      {children}
    </div>,
    document.body,
  )
}
