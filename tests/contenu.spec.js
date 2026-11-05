import { test, expect } from '@playwright/test'
import { open, card, title, titleLink, sentence, creator, lineCount, style, cssColor } from './helpers.js'

// Spec §2, §3 et §6 — S6 à S9

const WHITE = 'hsl(0, 0%, 100%)'
const BLUE_500 = 'hsl(215, 51%, 70%)'

test('S6 — titre, phrase, prix, durée, créateur ; images décoratives mais chargées', async ({ page }) => {
  await open(page, 1440, 900)
  await expect(title(page)).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(sentence(page)).toBeVisible()
  for (const text of ['0.041 ETH', '3 days left', 'Creation of Jules Wyvern']) await expect(card(page).getByText(text, { exact: true })).toBeVisible()
  await expect(card(page).getByRole('img')).toHaveCount(0)
  const imgs = card(page).locator('img')
  expect(await imgs.count()).toBeGreaterThanOrEqual(2)
  for (let i = 0; i < await imgs.count(); i++) expect(await imgs.nth(i).evaluate((img) => img.complete && img.naturalWidth > 0), `image ${i + 1}`).toBe(true)
})

for (const [w, h, size] of [[1440, 900, '18px'], [375, 667, '16px']]) {
  test(`S7 — ${w} px : la phrase en ${size} sur 2 lignes`, async ({ page }) => {
    await open(page, w, h)
    expect(await style(sentence(page), 'fontSize')).toBe(size)
    expect(await lineCount(sentence(page))).toBe(2)
  })
}

test('S8 — couleurs du titre, de la phrase, du prix, de la durée, du créateur et de la carte', async ({ page }) => {
  await open(page, 1440, 900)
  const white = await cssColor(page, WHITE)
  const blue = await cssColor(page, BLUE_500)
  expect(await style(titleLink(page), 'color'), 'titre').toBe(white)
  expect(await style(creator(page), 'color'), 'Jules Wyvern').toBe(white)
  expect(await style(sentence(page), 'color'), 'phrase').toBe(blue)
  expect(await style(card(page).getByText('3 days left', { exact: true }), 'color'), 'durée').toBe(blue)
  expect(await style(card(page).getByText('Creation of Jules Wyvern', { exact: true }), 'color'), 'Creation of').toBe(blue)
  expect(await style(card(page).getByText('0.041 ETH', { exact: true }), 'color'), 'prix').toBe(await cssColor(page, 'hsl(178, 100%, 50%)'))
  expect(await style(card(page), 'backgroundColor'), 'carte').toBe(await cssColor(page, 'hsl(216, 50%, 16%)'))
})

for (const colorScheme of ['light', 'dark']) {
  test(`S9 — appareil en thème ${colorScheme === 'light' ? 'clair' : 'sombre'} : le fond de la page reste Blue 950 (A6)`, async ({ page }) => {
    await page.emulateMedia({ colorScheme })
    await open(page, 375, 667)
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe(await cssColor(page, 'hsl(217, 54%, 11%)'))
  })
}
