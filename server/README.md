# Welcome to Card game (Server part)
This document will give you all needed APIs for Angular part of this Card game.

## Starting project

```
npm i
npm run start:dev
```

## APIs
### Cards
* *[Get]* **/api/cards** => Give all cards *(Return : CardModel[])*
* *[Get]* **/api/cards/:id** => Give card from his id *(Return : CardModel[])*
* *[Put]* **/api/cards** => Add a new card *(Body : Partial\<CardModel>)*
* *[Post]* **/api/cards** => Update an existing card *(Body : CardModel)*
* *[Delete]* **/api/cards/${id}** => Remove a card from his id

### Decks
* *[Get]* **/api/decks** => Give all decks *(Return : DeckModel[])*
* *[Get]* **/api/decks/${id}** => Give deck information with all cards from his id *(Return : DeckWithCardsModel)*
* *[Put]* **/api/decks** => Add a new deck *(Body : Partial\<DeckModel>)*
* *[Post]* **/api/decks** => Update an existing deck *(Body : DeckModel)*
* *[Delete]* **/api/decks/${id}** => Remove a deck from his id


## Models
### CardModel
```
CardModel {
    id: string | undefined;     // Card unique Id
    name: string;               // Card name
    value: number;              // Card power value
}
```

### DeckModel
```
DeckModel {
    id: string | undefined;     // Deck unique Id
    name: string;               // Deck name
    cards: string[];            // Ids of attached cards
}
```

### DeckWithCardsModel (ReadOnly)
```
DeckWithCardsModel {
    id: string | undefined;     // Deck unique Id
    name: string;               // Deck name
    cards: CardModel[];         // Complete attached cards
}
```