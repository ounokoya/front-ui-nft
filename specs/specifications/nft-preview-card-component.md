# Spec — NFT preview card component (refonte v2.0.0)

> SDL-FM 1.5.0 Phase 4 (remise à niveau, étape B, lot 2). Sources : analyse validée (G2) `specs/visuel/front-ui-nft-analyse.*`, maquette validée (G3) `specs/visuel/penpot/maquette.md`, décisions dans `specs/brainstorming/2026-11-05-front-ui-nft.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**.

## 1. Objectif

L'aperçu d'une œuvre NFT : l'image de l'œuvre, son titre, une phrase, le prix et le temps restant, puis le créateur. L'image et le titre mènent à la page de l'œuvre, le nom du créateur à sa page ; le challenge ne donne aucune adresse (Q-B1). Au survol, l'image se couvre d'un voile Cyan avec un œil (Q-B2).

## 2. Composants et contenu

| Composant | Contenu | Élément HTML attendu |
|---|---|---|
| Carte | tout ce qui suit, sauf le pied de page | `article` dans `main` |
| Œuvre | `image-equilibrium.jpg` (604 × 604), décorative (Q-B3) ; lien vers `#`, hors du clavier et des lecteurs d'écran : le titre le remplace (Q-B1) | `a` contenant `img alt=""` |
| Titre | « Equilibrium #3429 », lien vers `#` (Q-B1) | `h1` contenant `a` |
| Phrase | « Our Equilibrium collection promotes balance and calm. » | `p` |
| Prix · durée | icône `icon-ethereum.svg` et « 0.041 ETH » ; icône `icon-clock.svg` et « 3 days left » (icônes décoratives, Q-B3) | texte |
| Trait | décoratif | — |
| Créateur | avatar `image-avatar.png` décoratif (Q-B3) ; « Creation of » et le lien « Jules Wyvern » vers `#` (Q-B1) | `p` contenant `a` |
| Pied de page (Q-B4) | « Challenge by Frontend Mentor. Coded by Koya Esdras. » ; liens vers `https://www.frontendmentor.io?ref=challenge` et `https://www.frontendmentor.io/profile/ounokoya` | `footer` |

La page a pour titre « Frontend Mentor | NFT preview card component » et la langue `en`.

## 3. Tokens

Couleurs, typographie et mesures : `specs/reference/tokens.md` (FM) et la bibliothèque Penpot (`specs/visuel/penpot/maquette.md`). Aucune couleur dérivée.

| Rôle | Couleur |
|---|---|
| Fond de page | Blue 950 `hsl(217, 54%, 11%)` |
| Carte | Blue 900 `hsl(216, 50%, 16%)` |
| Titre, nom du créateur | White |
| Phrase, « 3 days left », « Creation of », texte de l'attribution | Blue 500 `hsl(215, 51%, 70%)` (6,62:1) |
| Prix, survols, voile de l'image, liens de l'attribution, contour de focus | Cyan 400 `hsl(178, 100%, 50%)` (Q-B4) |
| Trait | Blue 800 `hsl(215, 32%, 27%)` (décoratif) |

## 4. Responsive

| Largeur | Disposition |
|---|---|
| < 400 px (Q-B5) | Carte à 24 px des bords (350 px au plus), textes de la maquette mobile (phrase 16 px, prix et créateur 15 px). |
| ≥ 400 px (Q-B5, G3-1) | Carte de 350 px, textes de la maquette desktop (phrase 18 px, prix et créateur 16 px). |

La carte est centrée dans la fenêtre ; l'image est carrée, à 24 px des bords de la carte. Positions de la maquette, à 1 px près :

| Élément | 1440 × 900 | 375 × 667 | 768 × 1024 | 360 |
|---|---|---|---|---|
| Carte | (545, 152) 350 × 596 | (24, 62) 328 × 545 | (209, 214) 350 × 596 | x 24, largeur 312 |
| Œuvre | (569, 176) 302 × 302 | (48, 86) 280 × 280 | — | — |

La phrase tient sur 2 lignes, comme sur les images FM. Le pied de page ne déplace pas la carte : centré en bas de la fenêtre. La page reste utilisable de 320 px aux grands écrans, sans défilement horizontal.

## 5. États et interactions

| Élément | Normal | Survol | Focus clavier |
|---|---|---|---|
| Œuvre | l'image | voile Cyan 400 à 50 % et œil `icon-view.svg` au centre (Q-B2) | — (hors du clavier, Q-B1) |
| Titre | White | Cyan 400 | contour 2 px Cyan 400, décalé de 2 px |
| « Jules Wyvern » | White | Cyan 400 | contour 2 px Cyan 400, décalé de 2 px |
| Liens du pied de page | Cyan 400, soulignés (Q-B4) | soulignement retiré | contour 2 px Cyan 400, décalé de 2 px |

| Événement | Effet |
|---|---|
| Pointeur sur l'œuvre, puis hors de l'œuvre | le voile et l'œil apparaissent, puis disparaissent, par un fondu de 200 ms (Q-B2) |
| Clic sur l'œuvre | même destination que le titre (Q-B1) |

Toute transition est supprimée si `prefers-reduced-motion: reduce` : le voile apparaît d'un coup.

## 6. Accessibilité

### Contrats

| # | Contrat |
|---|---|
| A1 | Un seul `h1` : « Equilibrium #3429 ». |
| A2 | Œuvre, icônes et avatar décoratifs : ignorés par les lecteurs d'écran (Q-B3). |
| A3 | Un seul lien par destination pour le clavier et les lecteurs d'écran : le titre ; le lien de l'œuvre ne sert qu'au pointeur (Q-B1). |
| A4 | Contraste AA (4,5:1) pour tous les textes, y compris l'attribution sur fond sombre (Q-B4). |
| A5 | Ordre clavier : le titre, « Jules Wyvern », puis les deux liens du pied de page ; focus visible (2 px au moins, Cyan 400). |
| A6 | Le fond de la page est déclaré : le même en thème clair ou sombre de l'appareil. |
| A7 | Pas de transition si `prefers-reduced-motion: reduce`. |

### Noms accessibles utilisés par les tests

| Élément | Rôle | Nom |
|---|---|---|
| Carte | article | — (elle a la taille et la place de la carte : S1 à S3) |
| Titre | heading (niveau 1), avec un link | « Equilibrium #3429 » |
| Créateur | link | « Jules Wyvern » |
| Pied de page | contentinfo | liens « Frontend Mentor » et « Koya Esdras » |
| Œuvre | — (absente de l'arbre d'accessibilité) | l'image `image-equilibrium` de la carte |

## 7. Critères d'acceptation

```
Mise en page (positions de la maquette, à 1 px près)
S1  Given 1440 × 900   Then carte (545, 152) 350 × 596 ; œuvre (569, 176) 302 × 302
S2  Given 375 × 667    Then carte (24, 62) 328 × 545 ; œuvre (48, 86) 280 × 280
S3  Given 768 × 1024   Then carte (209, 214) 350 × 596 ; given 360 px  Then carte à x 24, 312 de large (Q-B5)
S4  Given 320, 399, 400, 768, 1440 px  Then pas de défilement horizontal
S5  Given 1440 × 900   Then le pied de page est sous la carte, centré, dans la fenêtre

Contenu
S6  Given la page  Then h1 « Equilibrium #3429 », la phrase, « 0.041 ETH », « 3 days left », « Creation of Jules Wyvern » ;
                   aucune image exposée aux lecteurs d'écran (œuvre, icônes et avatar chargés)
S7  Given 1440 × 900  Then la phrase en 18 px sur 2 lignes ; given 375 × 667  Then en 16 px sur 2 lignes
S8  Given la page  Then titre et « Jules Wyvern » en White ; phrase, durée et « Creation of » en Blue 500 ; prix en Cyan 400 ;
                   carte en Blue 900
S9  Given l'appareil en thème clair ou sombre  Then le fond de la page reste Blue 950 (A6)

Interactions
S10 Given l'œuvre  When le pointeur la survole  Then voile Cyan 400 à 50 % et œil blanc au centre ;
                   When il la quitte  Then l'image revient (Q-B2)
S11 Given l'œuvre  When le pointeur la survole  Then un fondu de 200 ms est joué ;
                   given prefers-reduced-motion: reduce  Then aucune transition, le voile apparaît d'un coup
S12 Given le titre ou « Jules Wyvern »  When je le survole  Then il passe de White à Cyan 400
S13 Given la page  When j'appuie sur Tab quatre fois  Then « Equilibrium #3429 », « Jules Wyvern », « Frontend Mentor », « Koya Esdras »,
                   chacun avec un contour Cyan 400 de 2 px au moins
S14 Given la page  Then 4 liens exposés (titre, créateur, attribution) ; titre et créateur vers « # » ;
                   When je clique sur l'œuvre  Then même destination que le titre (Q-B1)
S15 Given le pied de page  Then texte en Blue 500, liens en Cyan 400 soulignés, bonnes adresses ;
                   When je survole un lien  Then son soulignement disparaît (Q-B4)

Accessibilité et règles FM
S16 Given 375 et 1440 px  Then axe-core : aucune violation sérieuse ou critique
S17 Given le HTML servi  Then validateur W3C Nu : aucune erreur
S18 Given le HTML servi  Then html-validate au réglage de FM : aucune erreur
S19 Given le JavaScript du dépôt  Then eslint au réglage de FM : aucune erreur
    (et les tests de garde des règles FM déjà vues : longueurs en rem, aria-label, CSS logique)

Visuel (seuils calibrés en Phase 3, G3-2)
S20 1440 × 900 vs desktop.jpg ≤ 5,0 %
S21 1440 × 900, pointeur sur l'œuvre vs etats.jpg ≤ 5,0 %
S22 375 × 667 vs mobile.jpg ≤ 5,0 %
```
