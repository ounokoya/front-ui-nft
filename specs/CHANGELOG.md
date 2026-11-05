# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [2.0.0] — 2026-11-05

Refonte complète de la solution de 2023 (SDL-FM 1.5.0, remise à niveau du profil, étape B, lot 2), à partir du starter actuel, dans le même dépôt.

### Added
- Lien de l'œuvre réservé au pointeur (`tabindex="-1"`, `aria-hidden`), le titre étant le lien du clavier et des lecteurs d'écran (Q-B1, ADR-0005).
- Voile Cyan à 50 % et œil au survol de l'œuvre, fondu de 200 ms, sans fondu avec `prefers-reduced-motion` (Q-B2).
- Titre et créateur en liens, Cyan au survol ; œuvre, icônes et avatar décoratifs (Q-B3).
- Carte de 350 px au plus, à 24 px des bords des petits écrans, textes desktop dès 400 px (Q-B5, G3-1, ADR-0006).
- Outfit servie avec le site par Fontsource (ADR-0004).
- Attribution de Koya Esdras en Cyan sur le fond sombre (Q-B4).
- Tests : 22 scénarios de la spec, axe-core, validateur W3C Nu, html-validate et eslint réglés comme FM, règles FM déjà vues, fitness functions des ADR-0003 et ADR-0004, comparaisons visuelles (0,40 % ; 0,55 % ; 2,39 % pour un seuil de 5 %).

### Changed
- Vite 8 et Tailwind CSS v4 (tokens dans `@theme`, ADR-0003) au lieu de Vite et Tailwind v3 ; publication sur GitHub Pages (branche `gh-pages`) au lieu de Netlify.

### Removed
- Code de 2023 (restes du modèle Vite, dont `counter.js`) et README du starter.
