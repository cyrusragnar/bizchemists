import { useCallback, useEffect, useState } from 'react'
import Preloader from './Preloader.jsx'
import Nav from './Nav.jsx'
import Hero from './Hero.jsx'
import ProcessStack from './ProcessStack.jsx'
import { Contact, Faq, Marquee, Portfolio, Services, Story, Values } from './Sections.jsx'
import CaseStudyPage from './CaseStudyPage.jsx'
import { WORK, STUDIES } from './content.js'
import { routeOf, usePath } from './router.js'
import { initScrollScenes, initSmoothScroll } from './motion.js'

/* One rAF-throttled listener feeds every cursor effect through CSS vars,
   so pointer motion never triggers a React render. */
function usePointerVars() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const root = document.documentElement
    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const write = () => {
      frame = 0
      // nothing lime is drawn at screen-centre until the pointer has actually moved
      root.classList.add('cursor-live')
      root.style.setProperty('--mx', x + 'px')
      root.style.setProperty('--my', y + 'px')
    }
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(write)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const path = usePath()
  usePointerVars()

  const study = WORK.find((w) => routeOf(path) === '/work/' + STUDIES[w.client].slug)

  const onPreloaderDone = useCallback(() => setLoading(false), [])

  // nothing scrolls behind the reaction
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  // Scroll machinery starts only once the preloader has cleared, so ScrollTrigger
  // measures the settled layout rather than the locked one.
  useEffect(() => {
    if (loading) return
    const stopScroll = initSmoothScroll()
    const stopScenes = initScrollScenes()
    return () => {
      stopScenes()
      stopScroll()
    }
  }, [loading])

  if (study) {
    return (
      <div className="cursor-host">
        <div className="cursor-bloom" aria-hidden="true" />
        <div className="cursor-ring" aria-hidden="true" />
        <CaseStudyPage item={study} />
      </div>
    )
  }

  return (
    <div className="cursor-host">
      {loading && <Preloader onDone={onPreloaderDone} />}

      <div className="cursor-bloom" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      <Nav play={!loading} />

      <main>
        <Hero play={!loading} />
        <Marquee />

        {/* Stacking slides: Story pins on its last screen and What We Formulate
            scrolls up and covers it completely — the section replaces the section.
            Pinning the last screen rather than making the whole section `height:100vh`
            is what lets it work with real content: a sticky element taller than the
            viewport pins its top and its lower half becomes unreachable. */}
        <div data-stack-under className="relative z-0">
          <div data-stack-under-inner>
            <Story />
          </div>
        </div>
        <div className="relative z-10 bg-forest">
          <Services />
        </div>

        <ProcessStack />
        <Portfolio />
        <Values />
        <Faq />
      </main>

      <Contact />
    </div>
  )
}
