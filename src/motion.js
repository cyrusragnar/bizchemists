import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ------------------------------------------------------------ smooth scroll */

export function initSmoothScroll() {
  if (prefersReduced()) return () => {}

  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  /* Anchor jumps route through Lenis so a nav click takes the same ~1.1s whether the
     target is one section down or 12,000px away. Native smooth scroll scales duration
     with distance, which reads as a hang on a page this long. */
  const onClick = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href')
    if (!id || id === '#') return
    const target = document.querySelector(id)
    if (!target) return
    e.preventDefault()
    lenis.scrollTo(target, { offset: -88, duration: 1.1 })
  }
  document.addEventListener('click', onClick)

  return () => {
    document.removeEventListener('click', onClick)
    gsap.ticker.remove(raf)
    lenis.destroy()
  }
}

/* -------------------------------------------------------------- split text */

function splitWords(el) {
  if (el.dataset.splitReady === 'true') return
  const text = el.textContent || ''
  el.setAttribute('aria-label', text.trim())
  el.textContent = ''

  text.split(/(\s+)/).forEach((part) => {
    if (!part.trim()) {
      el.appendChild(document.createTextNode(part))
      return
    }
    const mask = document.createElement('span')
    mask.className = 'split-mask'
    mask.setAttribute('aria-hidden', 'true')
    const word = document.createElement('span')
    word.className = 'split-word'
    word.textContent = part
    mask.appendChild(word)
    el.appendChild(mask)
  })

  el.dataset.splitReady = 'true'
}

/* ------------------------------------------------------------ scroll scenes */

export function initScrollScenes() {
  // `has-js` hides pre-animation state for one frame; from here GSAP owns visibility,
  // and if anything below throws we must not leave the page blank.
  const unhide = () => document.documentElement.classList.remove('has-js')

  let ctx
  try {
    ctx = gsap.context(() => {
    // Reduced motion still gets the content — it just arrives without travel.
    if (prefersReduced()) {
      gsap.set('[data-split], [data-reveal] > *, [data-reveal-item]', { autoAlpha: 1, clearProps: 'all' })
      gsap.set('[data-split], [data-reveal]', { autoAlpha: 1 })
      return
    }

    /* 1 — kinetic typography on display headings */
    gsap.utils.toArray('[data-split]').forEach((el) => {
      splitWords(el)
      gsap.set(el, { autoAlpha: 1 })
      gsap.fromTo(
        el.querySelectorAll('.split-word'),
        { yPercent: 110, autoAlpha: 0, filter: 'blur(8px)' },
        {
          yPercent: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power4.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        },
      )
    })

    /* 2 — section reveals: fade, rise, and resolve out of blur */
    gsap.utils.toArray('[data-reveal]').forEach((section) => {
      const items = section.querySelectorAll('[data-reveal-item]')
      const targets = items.length ? items : section.children
      gsap.set(section, { autoAlpha: 1 })
      gsap.fromTo(
        targets,
        { y: 36, autoAlpha: 0, filter: 'blur(8px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 85%', once: true },
        },
      )
    })

    /* 3 — process stack: no scaling. Each card simply pins over the one before it,
       and the increasing sticky offsets leave every previous card's top edge showing
       as a strip — a pile of cards, not a receding stack. */

    /* 3b — service rows arrive from alternating sides */
    gsap.utils.toArray('[data-slide]').forEach((el) => {
      gsap.from(el, {
        x: Number(el.dataset.slide) * 90,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })

    /* 4 — parallax layers. Every layer has overflow headroom so it never shows an edge. */
    gsap.utils.toArray('[data-parallax]').forEach((layer) => {
      const speed = Number(layer.dataset.parallax || -0.12)
      const scope = layer.closest('[data-parallax-scope]') || layer
      gsap.to(layer, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: scope,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    /* 6 — stacking slides: the section underneath simply holds still while the next
       one scrolls up over it. No scale, no fade — the reference is a clean cover. */
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.utils.toArray('[data-stack-under]').forEach((under) => {
        ScrollTrigger.create({
          trigger: under,
          start: 'bottom bottom',
          end: () => '+=' + Math.round(window.innerHeight * 0.9),
          pin: under,
          /* `pinSpacing: false` is the whole trick. With spacing on, ScrollTrigger
             inserts filler after the pinned section, so the next one is pushed down
             and never overlaps. With it off, Story simply holds while What We
             Formulate scrolls up and covers it. */
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        })
      })
    })

    /* 7 — focus wheel: the line nearest the centre of the screen is sharp, the rest
       fall out of focus above and below it. */
    gsap.utils.toArray('[data-focus-item]').forEach((el) => {
      gsap
        .timeline({
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
        .fromTo(
          el,
          { filter: 'blur(9px)', opacity: 0.28, scale: 0.9 },
          { filter: 'blur(0px)', opacity: 1, scale: 1, ease: 'none', duration: 0.5 },
        )
        .to(el, { filter: 'blur(9px)', opacity: 0.28, scale: 0.9, ease: 'none', duration: 0.5 })

    })

    /* Exactly one line carries the arrow. A start/end band cannot guarantee that —
       three items sat inside it at once — so pick the nearest to the screen centre. */
    gsap.utils.toArray('[data-focus-wheel]').forEach((wheel) => {
      const items = gsap.utils.toArray(wheel.querySelectorAll('[data-focus-item]'))
      const pick = () => {
        const mid = window.innerHeight / 2
        let best = null
        let bestDist = Infinity
        items.forEach((el) => {
          const r = el.getBoundingClientRect()
          const d = Math.abs(r.top + r.height / 2 - mid)
          if (d < bestDist) {
            bestDist = d
            best = el
          }
        })
        const inRange = bestDist < window.innerHeight * 0.42
        items.forEach((el) => el.classList.toggle('is-focused', el === best && inRange))
      }
      ScrollTrigger.create({
        trigger: wheel,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: pick,
        onRefresh: pick,
        onLeave: () => items.forEach((el) => el.classList.remove('is-focused')),
        onLeaveBack: () => items.forEach((el) => el.classList.remove('is-focused')),
      })
    })

    /* 5 — footer hands off with a slow lift of its contents, not of the panel */
    const footerInner = document.querySelector('[data-footer-inner]')
    if (footerInner) {
      gsap.fromTo(
        footerInner,
        { yPercent: -6 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: footerInner, start: 'top bottom', end: 'top 45%', scrub: 1 },
        },
      )
    }
    })
  } catch (err) {
    // Better a page with no scroll choreography than a blank one.
    console.error('[motion] scroll scenes failed to start', err)
  } finally {
    unhide()
  }

  // Layout settles late on this page: hero art, six posters, one webfont.
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  const t = setTimeout(refresh, 1200)

  return () => {
    window.removeEventListener('load', refresh)
    clearTimeout(t)
    ctx?.revert()
  }
}

export { gsap }
