# ADR-0005 : Lien de l'œuvre réservé au pointeur ; voile et œil en surimpression

## Statut
Accepté (2026-11-05) — décisions G2 (Q-B1, Q-B2, Q-B3).

## Contexte
L'image de l'œuvre et le titre mènent au même endroit (Q-B1) : deux liens identiques feraient deux arrêts au clavier et deux annonces pour les lecteurs d'écran (A3). Au survol, l'image se couvre d'un voile Cyan 400 à 50 % avec l'œil `icon-view.svg` au centre, par un fondu de 200 ms, sans fondu si `prefers-reduced-motion: reduce` (Q-B2, S10, S11). Le titre et « Jules Wyvern » passent en Cyan à leur propre survol (S12).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Lien de l'œuvre `tabindex="-1"` et `aria-hidden="true"`, voile dans ce lien (choisie, Q-B1)** | Un seul arrêt au clavier et une seule annonce : le titre ; le survol de l'image et celui du titre restent séparés, comme sur l'image des états ; CSS simple (`:hover` du lien) | Deux `a` vers la même adresse dans le HTML |
| Lien du titre étiré sur l'image (pseudo-élément posé sur l'œuvre) | Un seul lien dans le HTML | Le voile dépend d'un survol du titre (`:has()`), le contour de focus et la zone cliquable couvrent l'image et le titre |
| Un seul lien autour de l'image et du titre | Un seul lien | Le titre passe en Cyan au survol de l'image ; le contour de focus entoure toute la partie haute |

## Décision
- `a href="#" tabindex="-1" aria-hidden="true"` autour de l'`img` de l'œuvre (`width="604" height="604"`, `alt=""`, Q-B3) et d'un voile en surimpression : fond Cyan 400 à 50 %, œil en `img alt=""` 48 × 48 au centre, opacité 0 puis 1 au survol du lien, transition d'opacité de 200 ms, aucune transition avec `motion-reduce`.
- Titre : `h1` contenant `a href="#"` ; « Jules Wyvern » : `a href="#"` ; couleur Cyan 400 au survol, contour de focus 2 px Cyan 400 décalé de 2 px.
- Icônes Ethereum et horloge, avatar : `img alt=""` (Q-B3).
- `src/main.js` n'importe que la feuille de style.

## Conséquences
- Le clavier et les lecteurs d'écran ne voient que 4 liens (S13, S14) ; le pointeur peut cliquer sur l'image (S14).
- axe-core accepte un contenu `aria-hidden` qui n'est pas dans l'ordre du clavier (S16) ; html-validate 11 au réglage de FM aussi (essai du 2026-11-05). L'outil de FM utilise une version plus ancienne : une remarque sur ce point serait corrigée (règle de Koya), avec un test de garde.
- Vérifié par S10, S11 (pixels du voile et de l'œil, durée du fondu), S12 à S14 et la comparaison des états (S21).
