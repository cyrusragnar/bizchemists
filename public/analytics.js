/**
 * Google Analytics 4, loaded from our own origin.
 *
 * Google's snippet is an inline <script>, which this site's Content-Security-Policy
 * refuses on purpose: script-src is 'self' plus the tag host, with no 'unsafe-inline'.
 * Weakening that for one analytics tag would open the door to every injected script,
 * so the bootstrap lives in this file instead and only the tag library is fetched
 * from Google. Same measurement, same ID, no hole in the policy.
 *
 * Nothing loads on a development host, so local work and the test suite never land
 * in the reports.
 */
;(function () {
  var MEASUREMENT_ID = 'G-T6ZP3BG896'

  var host = location.hostname
  if (host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host.endsWith('.local')) return

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  // Queued now, sent as soon as the library below arrives.
  gtag('config', MEASUREMENT_ID)

  var tag = document.createElement('script')
  tag.async = true
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID
  document.head.appendChild(tag)
})()
