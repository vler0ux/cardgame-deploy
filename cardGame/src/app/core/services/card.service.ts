import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CardModel {
    id: string | undefined;     // Card unique Id
    name: string;               // Card name
    value: number;              // Card power value
}
export interface DeckModel {
  id?: string;
  name: string;
  cards: string[]; // juste les IDs
}

export interface DeckWithCardsModel {
  id?: string;
  name: string;
  cards: CardModel[];
}


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
  getCardById(id: string): Observable<CardModel[]> {
    return this.http.get<CardModel[]>(`${this.apiUrl}/${id}`);
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
