import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { BIZTHREAD } from './content.js'
import { DISPLAY, Section } from './ui.jsx'
import { prefersReduced } from './motion.js'

const { thread } = BIZTHREAD
// the order confirmation lands as one more beat after the last message
const BEATS = thread.messages.length + 1

/**
 * Plays the sample thread once, the first time the card is properly on screen: each
 * agent reply is preceded by its typing indicator, then the order confirms. Every
 * bubble is rendered from the start and only fades in, so the card never changes
 * height while it plays.
 */
function useThreadPlayback(ref) {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(-1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) {
      setShown(BEATS)
      return
    }

    const timers = []
    const at = (ms, fn) => timers.push(setTimeout(fn, ms))
    const play = () => {
      let t = 500
      thread.messages.forEach((m, i) => {
        if (m.from === 'agent') {
          at(t, () => setTyping(i))
          t += 1000
        }
        at(t, () => {
          setTyping(-1)
          setShown(i + 1)
        })
        t += 750
      })
      at(t, () => setShown(BEATS))
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        play()
      },
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [ref])

  return { shown, typing }
}

const enter = 'transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'
const waiting = 'translate-y-2 opacity-0'

export default function BizThread() {
  const card = useRef(null)
  const { shown, typing } = useThreadPlayback(card)

  return (
    <Section id="bizthread">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        {/* The mark sits beside the heading, not inside it: data-split rebuilds the
            heading from its text and would throw an <img> away. Sized off the display
            scale so the glyph tracks the cap height at every width. */}
        <div className="flex items-center gap-2 md:gap-3">
          <span data-reveal className="block shrink-0">
            <img
              src="/brand/bizthread-logo.png"
              alt=""
              aria-hidden="true"
              width="128"
              height="128"
              className="block w-auto"
              style={{ height: DISPLAY.fontSize }}
            />
          </span>
          <h2 data-split className="uppercase text-white lg:whitespace-nowrap" style={DISPLAY}>
            BizThread AI
          </h2>
        </div>
        <p data-reveal className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
          {BIZTHREAD.intro}
        </p>
      </div>

      {/* Phone-first order: pitch, then the thread, then the detail and the button.
          From lg the thread moves into its own column spanning both rows. */}
      <div
        data-reveal
        className="mt-14 grid gap-12 rounded-[10px] border border-white/15 bg-forest p-6 sm:p-10 md:mt-20 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10 lg:p-14"
      >
        <div data-reveal-item className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
          <h3
            className="uppercase text-white"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)', lineHeight: 0.95, fontWeight: 600, letterSpacing: '-0.03em' }}
          >
            {BIZTHREAD.headline}
          </h3>
          <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-white/75">{BIZTHREAD.body}</p>
        </div>

        <div
          data-reveal-item
          className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center"
        >
          <figure ref={card}>
            <div className="thread-card rounded-[10px] border border-white/15 bg-ink p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white"
                  >
                    {thread.name[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{thread.name}</span>
                    <span className="block text-[11px] uppercase tracking-widest text-muted">{thread.channel}</span>
                  </span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">{thread.time}</span>
              </div>

              <ul className="mt-5 flex flex-col gap-3">
                {thread.messages.map((m, i) => {
                  const agent = m.from === 'agent'
                  return (
                    <li key={i} className={`relative flex ${agent ? 'justify-end' : 'justify-start'}`}>
                      {agent && (
                        <span
                          aria-hidden="true"
                          className={`typing-dots absolute right-0 top-0 transition-opacity duration-200 ${
                            typing === i ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <span />
                          <span />
                          <span />
                        </span>
                      )}
                      <p
                        lang={m.lang}
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                          agent ? 'rounded-br-md bg-accent text-ink' : 'rounded-bl-md bg-white/10 text-white'
                        } ${enter} ${shown > i ? '' : waiting}`}
                      >
                        {m.text}
                      </p>
                    </li>
                  )
                })}
              </ul>

              <p
                className={`mt-5 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-accent ${enter} ${
                  shown >= BEATS ? '' : waiting
                }`}
              >
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
                {thread.order}
              </p>
            </div>
            <figcaption className="mt-3 text-right text-[11px] uppercase tracking-widest text-muted">
              Sample conversation
            </figcaption>
          </figure>
        </div>

        <div data-reveal-item className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
          <ul className="border-t border-white/15">
            {BIZTHREAD.jobs.map((job) => (
              <li
                key={job.title}
                className="grid gap-1 border-b border-white/15 py-4 sm:grid-cols-[15rem_1fr] sm:gap-6 lg:grid-cols-1 lg:gap-1 xl:grid-cols-[15rem_1fr] xl:gap-6"
              >
                <h4 className="text-sm font-semibold uppercase tracking-wide text-white">{job.title}</h4>
                <p className="text-sm leading-relaxed text-white/60">{job.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={BIZTHREAD.url}
              target="_blank"
              rel="noopener"
              className="press group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-white"
            >
              Visit BizThread AI
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <p className="text-xs uppercase tracking-widest text-white/60">{BIZTHREAD.offer}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
