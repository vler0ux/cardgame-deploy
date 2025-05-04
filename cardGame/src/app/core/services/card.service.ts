import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CardModel } from '../models/card.model';
import { DeckModel } from '../models/deck.model';
import { DeckWithCardsModel } from '../models/deckWithCards.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/cards`;

  //Récupérer toutes les cartes
  getCards(): Observable<CardModel[]> {
    return this.http.get<CardModel[]>(this.apiUrl);
  }

  // Récupérer une carte spécifique par son ID
  getCardById(id: string): Observable<CardModel> {
    return this.http.get<CardModel>(`${this.apiUrl}/${id}`);
  }

  //créer une carte
  createCard(card: Partial<CardModel>): Observable<CardModel> {
    return this.http.put<CardModel>(this.apiUrl, card);
  }

  // Mettre à jour une carte
  updateCard(card:CardModel): Observable<CardModel> {
    return this.http.post<CardModel>(this.apiUrl, card);
  }

  deleteCard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
