import { test, expect } from '@playwright/test'
import { open, artwork, titleLink, creator, link, box, style, cssColor, pixel, close } from './helpers.js'

// Spec §5 et §6 — S10 à S15

const CYAN = 'hsl(178, 100%, 50%)'
const CYAN_RGB = [0, 255, 247]

// Un point de l'œuvre loin de l'œil, et le centre de l'œuvre (pupille de l'œil)
async function points(page) {
  const a = await box(artwork(page))
  return { spot: { x: a.x + 21, y: a.y + 24 }, centre: { x: a.x + a.width / 2, y: a.y + a.height / 2 } }
}
const veiled = (rgb) => rgb.map((c, i) => (c + CYAN_RGB[i]) / 2)

test.beforeEach(async ({ page }) => {
  await open(page, 1440, 900)
})

test('S10 — survol de l\'œuvre : voile Cyan à 50 % et œil au centre, puis retour (Q-B2)', async ({ page }) => {
  const { spot, centre } = await points(page)
  await page.mouse.move(0, 0)
  const before = await pixel(page, spot)
  await page.mouse.move(centre.x, centre.y)
  await expect.poll(async () => close(await pixel(page, spot), veiled(before), 12), { message: 'voile' }).toBe(true)
  expect(Math.min(...await pixel(page, centre)), 'œil blanc au centre').toBeGreaterThanOrEqual(220)
  await page.mouse.move(0, 0)
  await expect.poll(async () => close(await pixel(page, spot), before, 6), { message: 'retour' }).toBe(true)
})

test('S11 — fondu de 200 ms ; aucune transition avec prefers-reduced-motion', async ({ page }) => {
  const { spot, centre } = await points(page)
  await page.mouse.move(0, 0)
  const before = await pixel(page, spot)
  await page.mouse.move(centre.x, centre.y)
  const durations = await page.evaluate(() => document.getAnimations().map((a) => a.effect.getTiming().duration))
  expect(durations, 'fondu').toContain(200)

  await page.mouse.move(0, 0)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForTimeout(300)
  await page.mouse.move(centre.x, centre.y)
  expect(await page.evaluate(() => document.getAnimations().length), 'transitions').toBe(0)
  expect(close(await pixel(page, spot), veiled(before), 12), 'voile d\'un coup').toBe(true)
})

test('S12 — survol du titre et de « Jules Wyvern » : de White à Cyan 400', async ({ page }) => {
  const white = await cssColor(page, 'hsl(0, 0%, 100%)')
  const cyan = await cssColor(page, CYAN)
  for (const [name, target] of [['titre', titleLink(page)], ['Jules Wyvern', creator(page)]]) {
    expect(await style(target, 'color'), name).toBe(white)
    await target.hover()
    await expect.poll(() => style(target, 'color'), { message: `${name} survolé` }).toBe(cyan)
  }
})

test('S13 — Tab : titre, créateur, puis les deux liens, chacun avec un contour Cyan de 2 px au moins', async ({ page }) => {
  const cyan = await cssColor(page, CYAN)
  const seen = []
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press('Tab')
    seen.push(await page.evaluate((c) => {
      const el = document.activeElement
      const s = getComputedStyle(el)
      return { name: el.textContent.trim(), outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 && s.outlineColor === c }
    }, cyan))
  }
  expect(seen.map((s) => s.name)).toEqual(['Equilibrium #3429', 'Jules Wyvern', 'Frontend Mentor', 'Koya Esdras'])
  for (const s of seen) expect.soft(s.outline, `contour sur « ${s.name} »`).toBe(true)
})

test('S14 — 4 liens exposés ; un clic sur l\'œuvre mène où mène le titre (Q-B1)', async ({ page }) => {
  await expect(page.getByRole('link')).toHaveCount(4)
  await expect(titleLink(page)).toHaveAttribute('href', '#')
  await expect(creator(page)).toHaveAttribute('href', '#')
  const { spot } = await points(page)
  const target = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest('a')?.getAttribute('href') ?? null, spot)
  expect(target, 'lien sous le pointeur').toBe(await titleLink(page).getAttribute('href'))
  await page.mouse.click(spot.x, spot.y)
  expect(page.url().endsWith('#'), page.url()).toBe(true)
})

test('S15 — pied de page : texte Blue 500, liens Cyan soulignés, sans soulignement au survol ; bonnes adresses', async ({ page }) => {
  await expect(link(page, 'Frontend Mentor')).toHaveAttribute('href', 'https://www.frontendmentor.io?ref=challenge')
  await expect(link(page, 'Koya Esdras')).toHaveAttribute('href', 'https://www.frontendmentor.io/profile/ounokoya')
  expect(await style(page.getByRole('contentinfo'), 'color'), 'texte').toBe(await cssColor(page, 'hsl(215, 51%, 70%)'))
  const cyan = await cssColor(page, CYAN)
  for (const name of ['Frontend Mentor', 'Koya Esdras']) {
    expect(await style(link(page, name), 'color'), name).toBe(cyan)
    expect(await style(link(page, name), 'textDecorationLine'), name).toBe('underline')
    await link(page, name).hover()
    await expect.poll(() => style(link(page, name), 'textDecorationLine'), { message: `${name} survolé` }).toBe('none')
  }
})
