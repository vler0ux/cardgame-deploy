import { CardModel } from './card.model';

export interface DeckWithCardsModel {
  id: string | undefined;     // Deck unique Id
  name: string;               // Deck name
  cards: CardModel[];         // Complete attached cards
}
