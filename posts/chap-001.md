---
title: Deno, Fresh, Deno deploy. Facile, mais pas trop.
description: Créer un site moderne avec Deno, Fresh et Tailwind CSS - une stack légère et performante, sans enlever la douceur d'une erreur de build.
date: "2026-01-21"
category: [tech, typescript, hype-stack]
published: true
---

Après plusieurs tests et itérations de blog, que ce soit avec des générateurs
type Zola / Hugo ou avec un framework classique comme Leptos, Svelte ou React,
Ce blog est finalement réalisé avec [Deno](https://deno.land/),
[Fresh](https://fresh.deno.dev/) et [Tailwind CSS](https://tailwindcss.com/).

### Les contraintes

Des technologies modernes avec un bon rapport faible nécessité de configuration
et liberté de développement pour pouvoir se concentrer sur l'écriture et le
design du site.

Compatibilité avec Tailwind 4 (je n'aime pas faire du CSS pur). Cela écarte les
environnement non js car la configuration est souvent fastidieuse (bye bye
[leptos 🦀](https://leptos.dev/)).

Déploiement simple et gratuit. [Deno deploy](https://deno.com/deploy) est
aujourd'hui une solution agréable et fiable (ou presque).

### Svelte x Deno

[Deno x Svelte](https://docs.deno.com/examples/svelte_tutorial/) a été ma base.
Le routing, la lecture des fichiers markdown et le thème (couleurs, layout) ont
été rapidement implémentés.

Un problème de compatibilité connu entre Deno et le processus de build de
SvelteKit (plus précisément l'étape d'analyse des fichiers générés). SvelteKit
génère des fichiers temporaires (comme `nodes/0.js`) et tente de les importer
dynamiquement pour les analyser. Deno a parfois du mal à résoudre ces chemins de
fichiers générés à la volée à l'intérieur du processus Vite. L'une des solutions
est d'utiliser Node pour le build puis d'exécuter avec Deno.

### Migration vers Fresh 🍋

Spoiler : IA to the rescue !

Après avoir fait le deuil douloureux de Svelte et initialisé le projet Fresh,
j'ai fait convertir les fichiers Svelte en Preact. Gemini 3 Pro pour créer le
plan, Gemini 3 Flash pour l'exécuter.

Fresh étant un framework fait pour Deno c'est un choix plus pragmatique.

### « emoji can destroy deno deploy 🥸 »

<img width="700" src="https://media.tenor.com/UP3tVJlv7DUAAAAC/gandalf-what.gif" alt="a man with long hair and a beard looks serious" />

Le package [`@deno/gfm`](https://jsr.io/@deno/gfm) qui permet le parsing des
fichiers markdown à comme dépendance
[@denosaurs/emoji](https://github.com/denosaurs/emoji) qui fais échoeur le
build. Il contient un immense dictionnaire JSON permettant d'établir la
correspondance entre `:ring :` et 💍. Il y manque un caractère d'échappement qui
provoque une erreur lors du build via Vite.

Pour résoudre ce problème, il suffit d'exclure `@denosaurs/emoji` de la config
vite

```ts
// vite.config.ts
export default defineConfig({
  plugins: [fresh(), tailwindcss()],
  ssr: {
    external: ["@denosaurs/emoji"],
  },
});
```

> EDIT : en voulant regénérer un build pour afficher l'output ici je me suis
> rendu compte que l'erreur semble être corrigée.

### « What the FOUC ? »

Le SSR et les frameworks à composants dynamiques (Fresh, Svelte, Nuxt...)
introduisent des effets de désynchronisation entre le rendu initial et
l’hydratation client, notamment pour les ressources externes et l’état global.
Avec les polices, un chargement différé (depuis `/static/`) provoque un
[FOUC (Flash of Unstyled Content)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
au premier affichage, résolu seulement après mise en cache par le navigateur.

Passer par un CDN permet la mise en cache des fonts, le FOUC n'arrive qu'au
premier chargement d'une nouvelle ressource.

Pour le theme, avec une solution via cookies, il faut ajouter un middleware pour
injecter le theme côté serveur. Seul soucis (actuellement non résolu) : la
navigation via l’historique reste affectée : le thème redevient celui de la
visite précédente, car le navigateur restaure la page telle qu’elle était en
cache, sans réévaluer les cookies ou le JS. Un refresh réaplique le theme de la
page.

<img width="800" src="/assets/FOUC.gif" alt="FOUC" />

### Conclusion

Je recommande fortement cette stack pour un blog personnel. Elle est
performante, légère et facile à maintenir.

Pour plus d'infos sur comment lancer, configurer et déployer ce type de projet,
je vous invite à consulter le
[README du projet](https://github.com/HorebZ/Horebz_scrolls/) (et en profiter
pour laisser une étoile 🌟).

> « Il n'y a pas de place pour la faiblesse quand on affronte les défis d'un
> monde en mutation. On doit faire des choix difficiles, abandonner ce qui nous
> est cher pour avancer. » <br /> \- Elrond, La Communauté de l'Anneau
