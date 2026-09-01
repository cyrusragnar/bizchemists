import { PROCESS } from './content.js'
import { DISPLAY } from './ui.jsx'

/**
 * Each step gets a tall scroll track holding a sticky card. The card pins, then the
 * next track's card rises over it. The scale/dim on the settled cards is scrubbed in
 * motion.js, keyed off the arriving card.
 */
export default function ProcessStack() {
  return (
    <section id="process" className="relative px-5 py-24 sm:px-8 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2
            data-split
            className="uppercase text-white"
            style={DISPLAY}
          >
            How We Formulate
          </h2>
          <p data-reveal className="max-w-[42ch] text-sm leading-relaxed text-muted md:text-base">
            Four stages, run in order. Each one compounds on the last until the brand is measurably ahead of
            where it started.
          </p>
        </div>

        {/* One shared container, every card sticky inside it. A card that has pinned
            stays pinned to the end of the stack, so all the earlier cards keep their
            top edges showing as strips — the pile in the reference. Per-card tracks
            were the mistake: each card unstuck when its own track ended and scrolled
            away instead of staying in the pile. */}
        <div data-stack className="relative mt-16 md:mt-24">
          {PROCESS.map((item, i) => {
            const isLast = i === PROCESS.length - 1
            return (
              <article
                key={item.step}
                data-stack-card
                style={{ top: `calc(var(--stack-top) + ${i * 28}px)` }}
                className={`stack-card sticky mb-10 flex min-h-[52vh] flex-col justify-between gap-10 rounded-[10px] border p-7 sm:p-10 md:min-h-[58vh] md:p-10 ${
                  isLast ? 'border-accent bg-accent text-ink' : 'border-white/15 bg-forest text-white'
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span
                    className={`text-sm font-semibold tracking-[0.3em] ${
                      isLast ? 'text-ink/60' : 'text-accent'
                    }`}
                  >
                    {item.step}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${
                      isLast ? 'text-ink/60' : 'text-muted'
                    }`}
                  >
                    {i + 1} / {PROCESS.length}
                  </span>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                  <h3
                    className="uppercase"
                    style={{
                      fontSize: 'clamp(2.25rem, 7vw, 5.5rem)',
                      lineHeight: 0.9,
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`max-w-[46ch] text-sm leading-relaxed md:text-base lg:text-right ${
                      isLast ? 'text-ink/80' : 'text-muted'
                    }`}
                  >
                    {item.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
