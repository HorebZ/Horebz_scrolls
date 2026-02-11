---
title: N'oublie jamais de te demander "pourquoi ?"
description: La frustration face au code legacy nous fait parfois oublier d'étudier son histoire. La dette d'hier peut-elle nous aider à mieux comprendre la dette de demain ?
category: [essai, brouillon, thinking, dev]
date: "2026-02-10"
published: true
---

_« Tiens tiens tiens, mais qui à encore écrit ça... git blame !»_

Cette phrase, on l’a tous prononcée – parfois avec ironie, parfois sans – quand
une implémentation nous bloque. Le
[code legacy](https://www.ibm.com/think/topics/legacy-code) a ce curieux pouvoir
de nous faire grincer des dents.
[Code smells](https://en.wikipedia.org/wiki/Code_smell), pratiques anciennes,
utilitaires dépréciés... Tant de choses qui limitent une évolution simple et
rapide. On se surprend à penser : _« Si seulement ils avaient fait les choses
"correctement",
[on n’en paierait pas le prix maintenant](https://en.wikipedia.org/wiki/Technical_debt).
»_

### Comprendre le contexte

Pourtant, se demander _« pourquoi ? »_, plutôt que de juger
[à l’aune des](https://www.questce.fr/expressions/a-l-aune-de-11594) contraintes
actuelles, est salvateur :

- Y avait-il une limitation technique à l’époque ?
- La deadline était-elle serrée ?
- Quelles étaient les spécifications techniques initiales ?
- La dette technique était-elle anticipée ou est-elle apparue ultérieurement ?

Cela nous rappelle que la dette n’est pas le fruit d’un manque de compétence –
même si parfois... [PEBKAC](https://fr.wikipedia.org/wiki/PEBKAC) –, mais d’une
réflexion résultant de problèmes que nous n’avons plus aujourd’hui.

C’est cette compréhension qui nous pousse à écrire aujourd’hui le code legacy de
demain avec plus de rigueur.

### Vers une gestion éclairée de la dette technique

> _« Everything we’re writing right now… maybe the code you’re building
> literally today, if things go really well, that is the legacy code of
> tomorrow. »_ — Shawna Martell,
> [Building Tomorrow’s Legacy Code, Today](https://www.infoq.com/presentations/challenges-strategy-legacy-code/)

Adopter cette démarche transforme notre rapport à la dette future. Documenter le
contexte, clarifier les choix et les compromis devient une évidence. La dette
assumée se distingue alors de la négligence, et chaque ligne de code reflète une
décision éclairée. Reste à déterminer le moment opportun pour la rembourser.
Réussir à
[ne jamais crée de dette sans ruinner son élan](https://dev.to/keyboardinterrupt/avoiding-technical-debt-without-sacrificing-forward-momentum-2dig)
est une arcane à étudier.

La dette technique n'est donc pas un héritage maudit - même si voué à se répéter
si oublié - mais une opportunité d'apprentissage qui nous guide vers une
meilleure maîtrise de notre métier.

> « Il n’y a pas de mal à fonder des espoirs sur ce qu’on ignore. » <br /> \-
> Gandalf, La Communauté de l’Anneau

---

_Merci à Seb, qui au cours d’une session de pair programming, m'a rappelé que «
l'important, c'est bien de se demander "pourquoi ?" » (citation approximative)._
