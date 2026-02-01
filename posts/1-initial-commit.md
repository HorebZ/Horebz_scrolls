---
title: Deno, Fresh, Deno deploy. Facile, mais pas trop.
description: Créer un site moderne avec Deno, Fresh et Tailwind CSS - une stack légère et performante, sans enlever la douceur d'une erreur de build.
date: "2026-01-31"
category: [tech, typescript, hype-stack]
published: true
---

# _~ WIP ~_

Apres plusieurs tests et itérations de blog, que ce soit avec des générateurs
type Zola / Hugo ou à avec un framework classique comme Leptos, Svelte ou React,
Ce blog est finalement réagliser en [Deno](https://deno.land/), [Fresh] et
Tailwind CSS.

### Les contraintes

Je voulais un blog moderne et rapide à deployer. Je voulais me concentrer sur
l'écriture et le design du site tout en apprenant de nouvelles technologies
(pratiquant surtout du VueJS jusqu'ici).

N'aimant pas la cémantique du css, Tailwind est incoutournable, surtout avec sa
version 4 plus agréable à utiliser. Cependant c'est fastidieux à mettre en place
dans un écosysteme non js (donc bye bye leptos 🦀).

Quitte à partir sur du ts, autant partir sur Deno, en prime on profite de deno
deploy. Sinon j'aurais utilsier bun et deployé sur github pages ou vercel.

### Svelte x Deno

Initialement partie sur Svelte pour son architecture et sa performance, j'ai du
migrer en cours de route pour Fresh à cause d' un problème de compatibilité
connu entre Deno et le processus de build de SvelteKit (plus précisément l'étape
d'analyse des fichiers générés). Au moment du build, SvelteKit génère des
fichiers temporaires (comme `nodes/0.js`) et tente de les importer dynamiquement
pour les analyser. Deno a parfois du mal à résoudre ces chemins de fichiers
générés à la volée à l'intérieur du processus Vite. L'une des solution est
d'utiliser node pour le build puis d'executer avec deno. Au dela du fais que ça
commence à sentir le coussinet grillé cette méthode ne semblais pas fonctionner
avec deno deploy malgré ce que la doc annonçait.

### Migration vers Fresh 🍋

Spoiler : IA to the rescue !

Apres avoir fait de deuil douleureux de svelte et initialiser le projet fresh,
j'ai fais convertir les fichiers svelte en preact. Gemini 3 pro pour crée le
plan, Gémini 3 flash pour l'éxecuter.

### « emoji can destroy deno deploy 🥸 »

<img width="200" src="https://media.tenor.com/UP3tVJlv7DUAAAAC/gandalf-what.gif" alt="a man with long hair and a beard looks serious" />

Le package `@deno/gfm` qui permet le parsing des fichiers markdown à comme
dépendance [@denosaurs/emoji](https://github.com/denosaurs/emoji) a un immense
fichier JSON qui permet de faire le raprochement entre `:ring:` et 💍. Il manque
un caractère d'échappement qui provoque la décadance de Rollup.

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

> EDIT : quelques jours plus tard, en cherchant la stack trace des builds en
> erreur je me suis rendu compte que mes anciens builds fonctionnaient. Une maj
> a du avoir lieu sur la version de deno deploy qui a résolu le problème.

### sibling effect

J'ai apris, malgré moi quelque peu, que le SSR et le systeme composant dynamique
à la Fresh, svelte, nuxt ect demande des points de vigilance : La majorité des
pages étant statiques, je js est envoyé (hydratation) à la suite :

- Avoir ses fonts depuis un CDN : Je pensais bien faire en ajoutant les fonts
  dans les static du repo mais un effet "sibling" à cause d'une chargement de la
  font apres le rendu initial de la page. Le probleme est similaire avec un CDN
  au premier appel, ensuite la font est mis en cache dans le navigateur et les
  prochains rendu sont fluides.
- Même soucis avec le theme : initialement je stockais l'information du theme
  dans le localStorage. J'aivais égaleemnt ce soucis d'effet sibling. En passant
  par les cookies, je n'ai plus ce soucis. Cependant, initialement sur un theme,
  que l'on change de page puis qu'on change de theme, revenir à la page d'avant
  via le navigateur (swipe sur la gauche ou via les fleches du navigateur) remet
  le theme de la page d'avant (et si on revient à la page d'avant, on remet le
  theme de la page d'avant).

### Conclusion

Malgré quelques soucis vite résolus, j'ai surtout pus me concetrer sur
l'etentiet : concevoir et écrire. Je l'a recommande, surtout pour un blog. Deno
2 est rétro compatible avec node.js et même si quelques point de friction existe
encore, c'est une stack qui évolue rapidement et qui est prometteuse.

> « Un long voyage commence par un premier pas » <br /> \- Bilbo Baggins, _Le
> Hobbit_
