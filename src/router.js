import { useEffect, useState } from 'react'

/**
 * Two shapes of route — the homepage, and /work/<slug>. That is not enough to justify
 * a routing dependency: pushState plus a popstate listener is the entire requirement.
 *
 * Every case study is also emitted as a real HTML file at build time, so a direct hit
 * or a shared link is served by the host without needing a rewrite rule, and links
 * carry the real path so crawlers reach those files.
 *
 * The hash branch is a fallback, not the design: a sandboxed host — the artifact
 * preview, for one — can refuse pushState outright, and a hero that cannot open a
 * case study is worse than an ugly URL.
 */
const readPath = () =>
  window.location.hash.startsWith('#/') ? window.location.hash.slice(1) : window.location.pathname

export function usePath() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const sync = () => setPath(readPath())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  return path
}

export function navigate(to) {
  if (readPath() === to) return
  try {
    window.history.pushState({}, '', to)
    // pushState does not fire popstate; usePath listens for one either way
    window.dispatchEvent(new PopStateEvent('popstate'))
  } catch {
    window.location.hash = '#' + to
  }
  window.scrollTo(0, 0)
}

/** Trailing slashes are how a static host serves /work/<slug>/index.html. */
export const routeOf = (path) => path.replace(/\/+$/, '') || '/'
