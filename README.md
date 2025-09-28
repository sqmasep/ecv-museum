# ECV Museum

Ce projet d'école est un site de musée présentant des peintures célèbres ainsi qu'une billetterie

## Pourquoi NextJS?

NextJS est le framework que j'utilise pour 99.99999% dans mes projets perso, et ça c'est dû à plusieurs facteurs. J'avais commencé React car c'était le choix populaire dans les frameworks frontend, et cette popularité est intéressante pour la documentation et les nombreux guides/tutos/aides en ligne. Ça a résolu beaucoup de problèmes que j'avais et j'ai tunnel sur cette techno, avec le nombre de libs disponibles aussi c'est le choix le plus intéressant.

Ensuite la suite logique c'est le fullstack, donc NextJS c'est le choix obvious quand on utilise React (non merci Remix)

Le routing c'est un gros point fort de Next, ça permet d'organiser les fichiers directement tout en ayant le routing de manière automatique. Encore une fois, c'est une techno populaire qui fonctionne bien et avec beaucoup d'avantages (la syntaxe: export const revalidate = ... qui est gérée automatiquement etc)

La popularité de NextJS incite aux développeurs de libs à créer des adapteurs, et donc on peut combiner des libs répondant à des besoins spécifiques sur le même framework, rendant l'expérience développeur très sympa.

Il y a quand même deux points pas évidents avec Next, c'est le stockage d'image et les websockets. Les websockets sont impossibles avec Next, ça nécessite un serv externe comme pour un jeu que je dev, et synchroniser les deux est encore un mystère pour moi, notamment pour le cache.

Une app NextJS est assez low-level par rapport à un wordpress aussi, il faut implémenter pas mal de choses à la main. C'est un inconvénient tout comme un avantage, ça permet d'avoir un contrôle total sur ce que fait l'app, contrairement à des plugins wordpress, mais par conséquent ça veut aussi dire de tout implémenter à la main.

Certains disent que NextJS est overkill pour des sites simples et que ça ne devrait pas être le choix par défaut, mais je suis en désaccord avec ça. Ça répond à une grande partie des cas de figures, site vitrine, site créatif, webapp, dashboard... sans détruire la performance derrière.

En conclusion j'aime bien NextJS pour tout ça
