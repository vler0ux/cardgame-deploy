import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CardModel } from '../models/card.model';
import { CardService } from './card.service';
import { DeckModel } from '../models/deck.model';
import { DeckWithCardsModel } from '../models/deckWithCards.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/api/decks`;

    getAllDecks(): Observable<DeckModel[]> {
      return this.http.get<DeckModel[]>(this.apiUrl);
    }
    addDeck(deck: Partial<DeckModel>): Observable<DeckModel> {
      return this.http.put<DeckModel>(this.apiUrl, deck);
    }
    deleteDeck(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    updateDeck(deck: DeckModel): Observable<DeckModel> {
      return this.http.post<DeckModel>(this.apiUrl, deck);
    }
     // Récupérer les cartes d'un deck spécifique
    getDeckCards(deckId: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${deckId}`);
     }
     addCardToDeck(deckId: string, cardId: string): Observable<DeckModel> {
      return this.http.post<DeckModel>(`/api/decks/${deckId}/cards/${cardId}`, {});
    }
    getDeck(id: string): Observable<DeckWithCardsModel> {
      return this.http.get<DeckWithCardsModel>(`${this.apiUrl}/${id}`);
    }
}
