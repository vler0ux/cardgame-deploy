import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardManagerComponent } from '../card-manager/card-manager.component';
import { CardService } from '../../core/services/card.service';
import { DeckService } from '../../core/services/deck.service';
import { CardModel } from '../../core/models/card.model';
import { DeckModel } from '../../core/models/deck.model';
import { CardListComponent } from '../card-list/card-list.component';


@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, CardListComponent],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  allCards: CardModel[] = [];
  decks: DeckModel[] = [];
  deckCards: CardModel[] = [];
  selectedDeckId: string | null = null;
  selectedCardIdToAdd: string = '';
  loading = false;
  errorMessage = '';
  form: FormGroup;


  constructor(private deckService: DeckService, private cardService: CardService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDecks();
    this.loadAllCards();
  }

  loadAllCards(): void {
    this.cardService.getCards().subscribe({
      next: (cards) => this.allCards = cards,
      error: (err) => this.errorMessage = 'Erreur lors du chargement des cartes'
    });
  }

  loadDecks() {
    this.loading = true;
    this.deckService.getAllDecks().subscribe({
      next: (data) => {
        this.decks = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des decks';
        this.loading = false;
        console.error(err);
      }
    });
  }

  removeCardFromDeck(deckId: string | undefined, cardId: string): void {
    if (deckId === undefined) {
      console.error('Le deckId est indéfini');
      return;
    }

    const deck = this.decks.find(d => d.id === deckId); // Comparaison de strings

    if (deck) {
      // Filtrer les cartes pour supprimer celle qui correspond à cardId
      deck.cards = deck.cards.filter(card => card !== cardId);

      // Appeler l'API pour mettre à jour le deck avec la carte supprimée
      this.deckService.updateDeck(deck).subscribe({
        next: () => {
          console.log(`Carte ${cardId} supprimée du deck ${deckId}`);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du deck', err);
          // Si l'API échoue, réajouter la carte pour éviter la désynchronisation
          deck.cards.push(cardId);
        }
      });
    } else {
      console.error('Deck non trouvé');
    }
  }

  addDeck(): void {
    if (this.form.invalid) return;
    const newDeck = { name: this.form.value.name, cards: [] };

    this.deckService.addDeck(newDeck).subscribe({
      next: (deck) => {
        this.decks.push(deck);
        this.form.reset();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout du deck';
        console.error(err);
      }
    });
  }

  // Afficher les cartes d'un deck spécifique
  loadDeckCards(deck: DeckModel) {
    this.deckCards = []; // reset

    deck.cards.forEach(cardId => {
      this.cardService.getCardById(cardId).subscribe(card => {
        this.deckCards.push(card);
      });
    });
  }

  viewDeckCards(deck: DeckModel) {
    this.selectedDeckId = deck.id!;
    this.loadDeckCards(deck);
  }

  deleteDeck(id: string): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce deck ?')) return;

    this.deckService.deleteDeck(id).subscribe({
      next: () => {
        this.decks = this.decks.filter(deck => deck.id !== id);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la suppression du deck';
        console.error(err);
      }
    });
  }

  addCardToSelectedDeck(deckId: string) {
    if (!this.selectedCardIdToAdd) return;

    const deck = this.decks.find(d => d.id === deckId);
    if (!deck) return;
    // Vérification de la taille du deck (maximum 5 cartes)
    if (deck.cards.length >= 5) {
      this.errorMessage = "Le deck ne peut contenir plus de 5 cartes.";
      return;
    }

    deck.cards.push(this.selectedCardIdToAdd); // push juste l'id, pas un objet complet

    this.deckService.updateDeck(deck).subscribe({
      next: (updatedDeck) => {
        if (this.selectedDeckId === deckId) {
          // ⚡ Recharger les cartes du deck avec une nouvelle requête
          this.deckService.getDeck(updatedDeck.id!).subscribe({
            next: (deckWithCards) => {
              this.deckCards = deckWithCards.cards; // ici on récupère les cartes complètes
            },
            error: () => {
              this.errorMessage = "Erreur lors du rechargement des cartes du deck.";
            }
          });
        }
      },
      error: () => {
        this.errorMessage = "Erreur lors de l'ajout de la carte au deck.";
      }
    });
  }

}
