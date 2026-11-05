# Mise à jour de la solution sur Frontend Mentor

> SDL-FM 1.5.0 Phase 13 (refonte v2.0.0). Textes préparés pour le formulaire « Edit solution » de la solution de 2023 : https://www.frontendmentor.io/solutions/nft-preview-card-component-jwtHXCl0-D (titre « position absolute, position relative, opacity, background image »). La modification est publique et faite au nom de Koya : elle n'est envoyée qu'avec son accord, au moment de l'envoi. Pas de nouveaux points (solution déjà soumise).

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | NFT preview card: one keyboard stop, Cyan hover overlay & Tailwind v4 (69) |
| Repository URL | https://github.com/ounokoya/front-ui-nft |
| Live site URL | https://ounokoya.github.io/front-ui-nft/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `playwright` |
| Visibilité | Public |
| Capture | « Regenerate screenshot » : la page a changé depuis 2023 |

Après l'envoi : « Regenerate report » (vérifications automatiques gratuites), en vérifiant d'abord que la solution n'a pas de rapport IA (sinon un crédit serait consommé : accord de Koya).

## What are you most proud of, and what would you do differently next time?

I'm most proud of the links: the image and the title lead to the same page, so the image link is for pointer users only (`tabindex="-1"`, `aria-hidden="true"`) and the title is the one link for the keyboard and screen readers. The hover overlay (Cyan at 50 % and the eye icon) fades in over 200 ms and appears at once with `prefers-reduced-motion`. Screenshots differ from the design JPGs by 0.40 % (desktop), 0.55 % (hover state) and 2.39 % (mobile) of pixels, and the 34 Playwright tests pass on the live site.

This is a rebuild of my 2023 solution. Next time, I'd write my "no hard-coded colour" check so that it reads only styles: it took "Equilibrium #3429" for the colour `#3429`.

## What challenges did you encounter, and how did you overcome them?

- **Testing the overlay without relying on the markup**: the test reads one pixel of the image before and during the hover; during the hover it must be the average of the image and Cyan, and the centre must be the white of the eye.
- **The attribution on a dark page**: the starter's link blue is 2.47:1 on the background, so the links use the design's Cyan (13.98:1).

## What specific areas of your project would you like help with?

1. Is a pointer-only image link (`tabindex="-1"` and `aria-hidden="true"`) a good pattern here, or would you stretch the title link over the image?
2. Would you show the overlay on keyboard focus of the title as well?
