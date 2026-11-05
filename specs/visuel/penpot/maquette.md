# Maquette Penpot — NFT preview card component (refonte v2.0.0)

> SDL-FM 1.5.0 Phase 3 (remise à niveau, étape B, lot 2). Fichier Penpot : « FM Newbie » (créé par Koya ; nom vérifié avant chaque écriture), page « NFT preview card ». **Validée (G3, 2026-11-05)** avec les propositions : carte de 350 px en tablette (Q-B5), seuils de 5 %, attribution en Cyan.
> Décisions G2 appliquées : un seul lien au clavier pour l'image et le titre (Q-B1), survol de l'image (Q-B2), images décoratives (Q-B3), attribution en Cyan (Q-B4), tablette (Q-B5).

## Rendu des exports

L'exportateur PNG de Penpot n'a pas les polices (M16). Chaque écran est exporté en **SVG**, ses `<style>` sont retirés, l'œuvre et l'avatar (adresse interne de Penpot) sont remplacés par les fichiers du starter (`media.json`), puis il est rendu dans Chromium avec **Outfit** (fichier de la police Google).

## Bibliothèque

### Couleurs (groupe « NFT »)

| Nom FM | Rôle | Valeur |
|---|---|---|
| Blue 500 | Paragraphe, durée, « Creation of », texte de l'attribution (6,62:1) | `#8BACDA` |
| Cyan 400 | Prix, survols, liens de l'attribution et contour de focus (Q-B4) | `#00FFF7` |
| Blue 950 | Fond de page | `#0D192B` |
| Blue 900 | Carte | `#14253D` |
| Blue 800 | Trait (décoratif) | `#2F415B` |
| White | Titre, nom du créateur | `#FFFFFF` |

Aucune couleur dérivée ; l'attribution prend le Cyan 400 (13,98:1 sur Blue 950) au lieu de `#3E52A3` (2,47:1).

### Typographie (Outfit)

| Usage | Desktop | Mobile |
|---|---|---|
| Titre (h1 > a) | 600, 22 px | 600, 22 px |
| Paragraphe | 300, 18 px, interligne 26 px | 300, 16 px, interligne 26 px |
| Prix · durée | 600 · 400, 16 px | 15 px |
| « Creation of » · « Jules Wyvern » | 300 · 400, 16 px | 15 px |
| Attribution | 400, 11 px | idem |

### Mesures (px)

| Élément | Desktop 1440 × 900 | Mobile 375 × 667 |
|---|---|---|
| Carte | 350 × 596 en (545, 152), rayon 15, ombre 0 25 50 noir 10 % | 328 × 545 en (24, 62) |
| Image | 302 × 302 à 24 du bord, rayon 8 (fichier 604 × 604) | 280 × 280 |
| Titre · paragraphe (capitales) | 358 · 402 sous le haut de la carte | 334 · 374 |
| Ligne du prix | icône Ethereum 11 × 18 à (24, 471), prix à x 42 ; horloge 17 × 17 à x 228, durée à x 251 | icône à y 435 ; horloge à x 210, durée à x 234 |
| Trait | 1 px, y 514 | y 469 |
| Créateur | avatar 33 px à (24, 531), contour blanc 1 px ; texte à x 74 | avatar à y 486 |

Tablette 768 × 1024 (proposition Q-B5) : la carte desktop centrée en (209, 214).

## Composants (`composants.png`)

| Composant | États |
|---|---|
| Image | Normal · Survol (voile Cyan 400 à 50 % et œil `icon-view.svg` au centre, Q-B2) |
| Titre | Normal (blanc) · Survol (Cyan) · Focus clavier (contour 2 px Cyan décalé de 2 px) |
| Créateur (« Jules Wyvern ») | Normal · Survol (Cyan) · Focus clavier |
| Attribution | Normal (texte Blue 500, liens Cyan soulignés, Q-B4) · Survol (soulignement retiré) · Focus clavier |

Le lien de l'image est hors de l'ordre du clavier (Q-B1) : il n'a pas d'état de focus.

## Écrans et seuils visuels (calibrage 1.1.0)

Écart = part des pixels dont un canal diffère de plus de 40 sur 255. Seuil de l'écran pour la Phase 7 = **max(5 %, écart + 1 point)**.

| Écran Penpot | Image FM | Écart | Seuil Phase 7 |
|---|---|---|---|
| Desktop · NFT preview card | `desktop.jpg` | 0,28 % | 5,0 % |
| Desktop · états (survols) | `etats.jpg` | 0,35 % | 5,0 % |
| Mobile · NFT preview card | `mobile.jpg` | 2,40 % | 5,0 % |

Notes :
- Toutes les lignes de texte sont à ± 1 px de l'image.
- Écran sans image FM : **Tablette · NFT preview card (proposition Q-B5)**.

## Prototype

| Parcours | Enchaînement |
|---|---|
| **Desktop · survol de l'image** | pointeur sur l'image → écran des états (voile, titre et créateur en Cyan) ; pointeur qui sort → retour (fondu 200 ms) |

## Fichiers

- `desktop.png`, `desktop-etats.png`, `mobile.png`, `tablette.png` : rendus des 4 écrans ; `apercu-maquette.png`.
- `comparaison-*.png` : image FM | maquette | écarts en rouge (moitié de la taille).
- `composants.png` : les composants et leurs états (échelle 2).
