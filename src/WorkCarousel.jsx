import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { WORK } from './content.js'

const N = WORK.length
/* How far from centre a card is, wrapped so the ring has no ends: -N/2 … +N/2 */
const offsetOf = (i, active) => ((((i - active) % N) + N + Math.floor(N / 2)) % N) - Math.floor(N / 2)
const VISIBLE = 2 // cards rendered either side of centre

export default function WorkCarousel({ onOpen }) {
  const [active, setActive] = useState(0)
  const stage = useRef(null)
  const drag = useRef(null)

  const step = useCallback((dir) => setActive((a) => (a + dir + N) % N), [])

  // keyboard: arrows move the ring when the stage has focus
  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    }
  }

  // pointer drag / swipe
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      drag.current = { x: e.clientX, moved: false }
    }
    const move = (e) => {
      if (!drag.current) return
      const dx = e.clientX - drag.current.x
      if (Math.abs(dx) > 60) {
        step(dx < 0 ? 1 : -1)
        drag.current = { x: e.clientX, moved: true }
      }
    }
    const up = () => {
      drag.current = null
    }
    el.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      el.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [step])

  return (
    <div data-reveal className="mt-12 md:mt-16">
      <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-4 px-5 sm:px-8 md:px-12">
        <p className="text-xs font-semibold tracking-[0.3em] text-muted">
          <span className="text-white">{String(active + 1).padStart(2, '0')}</span> / {String(N).padStart(2, '0')}
        </p>
      </div>

      {/* the ring */}
      <div
        ref={stage}
        role="group"
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Selected work — use the left and right arrow keys to browse"
        aria-roledescription="carousel"
        className="work-stage relative mt-6 select-none focus-visible:outline-none"
      >
        {WORK.map((item, i) => {
          const off = offsetOf(i, active)
          if (Math.abs(off) > VISIBLE) return null
          const isCentre = off === 0
          const abs = Math.abs(off)
          return (
            <button
              key={item.client}
              type="button"
              tabIndex={isCentre ? 0 : -1}
              aria-hidden={!isCentre}
              onClick={() => (isCentre ? onOpen(i) : step(off > 0 ? 1 : -1))}
              aria-label={isCentre ? `Read the ${item.client} case study` : `Bring ${item.client} to the front`}
              className={`work-slide absolute left-1/2 top-0 ${isCentre ? 'is-centre' : ''}`}
              style={{
                // translate first so the rotation pivots around the card, not the stage
                transform: `translateX(calc(-50% + ${off * 58}%)) rotateY(${off * -26}deg) scale(${1 - abs * 0.13})`,
                opacity: 1 - abs * 0.42,
                zIndex: N - abs,
                pointerEvents: abs > 1 ? 'none' : 'auto',
              }}
            >
              <div className="work-frame overflow-hidden rounded-2xl bg-forest">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  loading={abs <= 1 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-base font-semibold uppercase tracking-wide text-white md:text-lg">
                  {item.client}
                </h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {item.result}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous project"
          className="press flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">Drag to explore</p>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next project"
          className="press flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
