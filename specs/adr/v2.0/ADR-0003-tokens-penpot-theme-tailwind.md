# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`)

## Statut
Accepté (2026-11-05) — même décision que les challenges précédents.

## Contexte
La bibliothèque Penpot (validée G3, `specs/visuel/penpot/maquette.md`) fixe les 6 couleurs FM (aucune dérivée : l'attribution prend Cyan 400, Q-B4), la police, les tailles de texte, les rayons et l'ombre de la carte. Décisions communes : ADR-0001, ADR-0002 (`frontmentor/specs/adr/`).

## Décision
- `src/style.css` déclare les tokens dans un seul bloc `@theme` et vide la palette par défaut (`--color-*: initial`).
- Les longueurs des tokens sont écrites en rem (règle FM).
- Correspondance :

| Penpot | `@theme` |
|---|---|
| Couleurs FM | `--color-white`, `--color-blue-500`, `--color-cyan-400`, `--color-blue-800`, `--color-blue-900`, `--color-blue-950` (valeurs `hsl()` du style-guide) |
| Outfit | `--font-sans` (chargement : ADR-0004) |
| Tailles de texte | `--text-title` (22 px), `--text-body` (18 px, interligne 26 px) et `--text-body-mobile` (16 px, interligne 26 px), `--text-meta` (16 px) et `--text-meta-mobile` (15 px), `--text-attribution` (11 px) |
| Rayons | `--radius-card` (15), `--radius-image` (8) |
| Ombre | `--shadow-card` (0 25 50, noir à 10 %) |
- Point de rupture : `--breakpoint-sm: 25rem` (400 px, Q-B5, G3-1).

## Conséquences
- Changer une couleur du design = changer une ligne de `@theme`.
- Fitness function (test « ADR-0003 » de `tests/statique.spec.js`) : aucune couleur (`#…`, `rgb(`, `hsl(`) dans `index.html`, ni dans `src/style.css` hors des valeurs de tokens.
