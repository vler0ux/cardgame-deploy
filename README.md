# MyDigitalSchool-CardGame
Apprendre un Framework JS : Angular (B3 Developeur Web)

## Introduction
L'idée de ce projet est de réaliser un jeu de cartes avec des règles simple type "Bataille".
Pour cela, nous allons devoir gérer nos cartes, créer nos decks et lancer des parties de jeux.

### Les besoins
Nous voulons réaliser un jeu de cartes en utilisant le Framework Angular.
Le BackEnd sera fourni, pour faciliter le démarrage.

L'application doit être sécurisée. Le BackEnd est protégé grâce à un accès via un JWT Token, envoyé dans les Headers de chaque requête.

L'application ne peut être accessible sans avoir été connecté. les Urls d'accès doivent toutes être protégées.
L'application doit permettre à un joueur de se connecter grâce à un couple Login/Password.
Si le joueur n'a pas de compte, il doit pouvoir en créer un disposant des informations suivantes :
- Name
- Login
- Password

Lorsqu'un joueur est connecté, il doit pouvoir :
- Gérer ses cartes
- Gérer ses decks
- Démarrer une partie contre l'ordinateur
- Démarrer une partie contre un autre joueur (bonus)

Lorsqu'une API retourne une erreur, le client doit afficher un message d'erreur à l'utilisateur

#### Gestion des cartes
Le joueur doit pouvoir :
- Visualiser la liste des cartes à disposition
- Visualiser le détail de chaque carte
- Créer une nouvelle carte
- Modifier une carte existante
- Supprimer une carte

#### Gestion des decks
Le joueur doit pouvoir :
- Visualiser la liste des decks à disposition
- Visualiser le détail de chaque deck (avec la liste des cartes présent dans le deck)
- Créer un nouveau deck
- Modifier un deck existant
- Supprimer un deck

### Les règles de base
- Une carte doit comporter un nom, une description et une valeur de "force" (allant de 0 à 20)
- Une carte présente dans un deck ne peut pas être supprimée
- Un Deck doit comporter 5 cartes
- La force totale d'un deck ne doit pas dépasser 30 points

### Les règles du jeu
- Chaque joueur sélectionne un deck en début de partie (5 cartes)
- Chaque joueur sélectionne 1 carte, face cachée, sur le plateau central
- Quand tous les joueurs ont déposé leur carte et spécifié être "prêt", toutes les cartes sont retournées
- Le joueur qui a la carte la plus forte gagne 1 point
- Si les 2 joueurs ont une une carte de même valeur, alors aucun ne gagne
- Le joueur qui gagne la partie (5 coups) est le joueur qui a le plus de points.
- Si plusieurs joueurs ont le même score, aucun ne gagnent


## Règles de notation
2 évaluations seront effectuées lors de cette formation :
- Une évaluation à mi-parcours (à 21h) proposant un QCM de connaissances théoriques de 40 questions
- Une évaluation sur le rendu final du projet (à 42h)

### Notation sur le projet final
Outre le fait de savoir utiliser correctement les composants de base Angular, il sera porté une attention :
- *(5 points)* **A l'analyse du besoin**
    - Mise à disposition de schémas d'UX
    - Mise à disposition de documents permettant l'analyse et la conception suite à une réflexion globale sur le sujet
- *(5 points)* **Au Clean Code**
    - Le nommage des variables, fonctions, et classes
    - Typage des variables et fonctions
    - Utilisation des modèles de données
- *(5 points)* **L'architecture du projet**
    - Gestion des modules / composants
    - Organisation et découpage du code
    - Séparation des couches logiques
    - Communication entre composants
    - ...
- *(5 points)* **Gestion technique de Angular**
    - Utilisation des Routers / Resolvers / Guards / Interceptors
    - Utilisation du i18n
    - ...
- *(5 points)* **Gestion fine de Angular**
    - Taille des bundles
    - Gestion des fuites mémoires / désalocation des Observables
    - ...
- *(5 points)* **L'avancée du projet**
    - Tous les objectifs du cahier des charges sont remplis ?
    - Le projet présente t'il des bugs ?

*Notes :* 
- 2 points bonus seront attribués sur l'effort apporté au graphisme
- Les documents d'analyse et de conception peuvent être des scans de documents papier, fourni avec le projet lui-même
