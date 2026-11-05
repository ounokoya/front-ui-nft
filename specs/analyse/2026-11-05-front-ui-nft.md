# 2026-11-05 — Rapport d'exécution : NFT preview card component (v2.0.0)

> SDL-FM 1.5.0, Phases 7 et 8 (remise à niveau, étape B, lot 2). Tests sur le build de production (`vite build` + `vite preview`) ; parcours réel dans le navigateur intégré (configuration `nft-preview`, `http://localhost:4203/front-ui-nft/`), page affichée.

## 1. Tests automatiques (Phase 7)

`npm test` : **34 réussis sur 34**.

| Groupe | Scénarios | Résultat |
|---|---|---|
| Mise en page | S1 à S5 (1440, 375, 768 ; 360 px à 24 px des bords ; 320 à 1440 sans défilement horizontal ; pied de page) | ✅ 9 / 9 |
| Contenu | S6 à S9 (textes, images décoratives chargées ; phrase en 18 et 16 px sur 2 lignes ; couleurs ; fond en thème clair et sombre) | ✅ 6 / 6 |
| Interactions | S10 à S15 (voile et œil au survol, fondu de 200 ms et mouvements réduits, survols Cyan, ordre au clavier, 4 liens exposés et clic sur l'œuvre, attribution) | ✅ 6 / 6 |
| Accessibilité | S16 : axe-core à 375 et 1440 px | ✅ 2 / 2 |
| HTML, JavaScript, règles FM | S17 (W3C Nu), S18 (html-validate au réglage de FM), S19 (eslint), longueurs en rem, aria-label, CSS logique ; fitness ADR-0003 et ADR-0004 | ✅ 8 / 8 |
| Visuel | S20 à S22 | ✅ 3 / 3 |

### Comparaison visuelle

| Écran | Image FM | Pixels différents | Seuil | Penpot (Phase 3) |
|---|---|---|---|---|
| Desktop 1440 × 900 | `desktop.jpg` | 0,40 % | 5,0 % | 0,28 % |
| États 1440 × 900 (pointeur sur l'œuvre) | `etats.jpg` | 0,55 % | 5,0 % | 0,35 % |
| Mobile 375 × 667 | `mobile.jpg` | 2,39 % | 5,0 % | 2,40 % |

Contrôle rouge fait avant le code (Phase 4) : 27 échecs pour la bonne raison sur le starter et 5 tests de garde ; fitness functions (Phase 5) : 2 échecs attendus.

Deux tests corrigés pendant la Phase 6 (commit `fix(test)`, toujours rouges sur le starter) : la fitness function de l'ADR-0003 prenait « Equilibrium #3429 » pour une couleur `#3429` (elle ne lit plus que les classes, les styles et les blocs `<style>` du HTML) ; S14 lisait l'adresse avant la fin de la navigation vers « # » (`toHaveURL` attend).

## 2. Parcours réel (Phase 8)

| Étape | 320 px | 1440 px |
|---|---|---|
| Disposition | ✅ carte (24, 105) 272 × 490, œuvre de 224, phrase sur 2 lignes, pas de défilement horizontal | ✅ (tests S1, S5) |
| Police, images | ✅ Outfit 300, 400 et 600 chargées | ✅ |
| Survol de l'œuvre | — | ✅ voile Cyan et œil au centre, opacité 1 |
| Clavier | — | ✅ Tab : le titre d'abord, contour Cyan 2 px dès l'arrivée du focus ; le lien de l'œuvre a `tabindex="-1"` et `aria-hidden="true"` |

## 3. Écarts relevés et suites

Aucun écart.

## 4. Verdict

Conforme à la spec et à la maquette validée (G3). Prêt pour la Phase 9 (README).
