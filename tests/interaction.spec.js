// @ts-check
import { test, expect, devices } from '@playwright/test'

/**
 * Tests that drive the built site in a browser the way a person does.
 *
 * These exist because of a bug the static tests could not see: every sub-page left
 * body at overflow:hidden, so nothing could be scrolled by hand — while
 * window.scrollTo() kept working, which is what the checks had been using. A page
 * that scrolls programmatically and not by wheel or thumb is a page nobody can read.
 *
 * The same fault also held back the script that reveals content, so the footer on
 * every sub-page was invisible. Both are asserted here, per page type.
 */

const PAGES = [
  ['homepage', '/'],
  ['services hub', '/services/'],
  ['work hub', '/work/'],
  ['insights hub', '/insights/'],
  ['service page', '/services/video-production/'],
  ['case study', '/work/kostcon-2025/'],
  ['article', '/insights/how-to-launch-in-bangladesh/'],
]

/** The homepage holds the viewport until its intro finishes; the rest must not. */
async function settle(page, path) {
  await page.waitForTimeout(path === '/' ? 9000 : 1500)
}

test.describe('a person can actually use every page', () => {
  for (const [label, path] of PAGES) {
    test(`${label} scrolls with the wheel`, async ({ page }) => {
      await page.goto(path)
      await settle(page, path)

      const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow)
      expect(overflow, 'body must not be locked once the page is ready').not.toBe('hidden')

      const before = await page.evaluate(() => window.scrollY)
      await page.mouse.move(400, 400)
      await page.mouse.wheel(0, 1200)
      await page.waitForTimeout(1200)
      const after = await page.evaluate(() => window.scrollY)

      expect(after, `${label} did not move when the wheel was used`).toBeGreaterThan(before)
    })

    test(`${label} shows its footer`, async ({ page }) => {
      await page.goto(path)
      await settle(page, path)

      // the reveal machinery hides these until it runs; if it never runs they stay hidden
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1800)

      const footer = page.locator('footer').last()
      await expect(footer).toBeVisible()
      await expect(footer.getByText(/Let's Collaborate/i)).toBeVisible()

      const hidden = await page.evaluate(() => {
        const nodes = [...document.querySelectorAll('footer [data-split], footer [data-reveal]')]
        return nodes.filter((n) => getComputedStyle(n).visibility === 'hidden').length
      })
      expect(hidden, 'footer content left hidden by the reveal machinery').toBe(0)
    })
  }
})

test('a phone can scroll a sub-page by touch', async ({ browser }) => {
  const ctx = await browser.newContext({ ...devices['Pixel 5'] })
  const page = await ctx.newPage()
  await page.goto('/insights/how-to-launch-in-bangladesh/')
  await page.waitForTimeout(1500)

  const before = await page.evaluate(() => window.scrollY)
  await page.touchscreen.tap(200, 400)
  // a swipe, not a scrollTo: the point is that touch input moves the page
  await page.evaluate(() => {
    const send = (type, y) =>
      document.dispatchEvent(
        new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [new Touch({ identifier: 1, target: document.body, clientX: 200, clientY: y })],
        }),
      )
    send('touchstart', 600)
    send('touchmove', 200)
    send('touchend', 200)
  })
  await page.mouse.wheel(0, 900)
  await page.waitForTimeout(1200)
  const after = await page.evaluate(() => window.scrollY)
  expect(after, 'the page did not move for a touch device').toBeGreaterThan(before)
  await ctx.close()
})

test('navigating between pages leaves the next one usable', async ({ page }) => {
  await page.goto('/services/')
  await page.waitForTimeout(1500)
  await page.locator('a[href="/services/video-production/"]').first().click()
  await page.waitForTimeout(1500)

  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe('hidden')
  const before = await page.evaluate(() => window.scrollY)
  await page.mouse.wheel(0, 1200)
  await page.waitForTimeout(1200)
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(before)
})
