# ADR-0006 : Carte centrée dans la fenêtre, pied de page en bas sans la décaler

## Statut
Accepté (2026-11-05) — même principe que le Results summary (ADR-0006).

## Contexte
La carte est centrée dans la fenêtre à toutes les largeurs ((545, 152) à 1440 × 900, (24, 62) à 375 × 667, (209, 214) à 768 × 1024). Elle mesure 350 px au plus et reste à 24 px des bords des petits écrans ; sous 400 px, les textes sont ceux de la maquette mobile (Q-B5, G3-1). L'attribution (Q-B4), absente des images FM, doit tenir sous la carte sans la déplacer (S5).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Grille de 3 rangées `1fr auto 1fr` sur toute la hauteur (choisie)** | La carte est exactement au centre, à toutes les largeurs ; le pied de page se place en bas de la 3e rangée ; si la fenêtre est trop basse, la page s'allonge au lieu de superposer | — |
| Pied de page en position absolue en bas de la fenêtre | Simple | Passe sur la carte dans une fenêtre basse |
| Pied de page dans le flux, sous la carte | Simple | Décale la carte de la moitié de la hauteur du pied de page |

## Décision
- `body` en grille `grid-rows-[1fr_auto_1fr]` de hauteur minimale `100dvh`, `main` dans la 2e rangée, `footer` en bas de la 3e.
- Carte : largeur `min(21.875rem, 100% - 3rem)`, marge interne de 24 px ; l'œuvre carrée à pleine largeur de la zone de contenu.
- Tailles de texte mobiles par défaut, desktop dès `sm` (400 px, tokens de l'ADR-0003).
- Trait : bordure haute (`border-block-start`, 1 px Blue 800) du bloc du créateur ; il est décoratif, ce n'est pas un `hr`.

## Conséquences
- Positions S1 à S5 tenues par une seule grille et une seule largeur ; rien ne se superpose quelle que soit la hauteur de la fenêtre.
