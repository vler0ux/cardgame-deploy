import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeckService } from '../../core/services/deck.service';
import { CardModel } from '../../core/models/card.model';
import { DeckWithCardsModel } from '../../core/models/deckWithCards.model';
import { DeckModel } from '../../core/models/deck.model';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  decks: DeckModel[] = [];

  selectedPlayer1DeckId = '';
  selectedPlayer2DeckId = '';

  player1DeckCards: CardModel[] = [];
  player2DeckCards: CardModel[] = [];

  player1SelectedCard: CardModel | null = null;
  player2SelectedCard: CardModel | null = null;

  player1Score = 0;
  player2Score = 0;

  player1Ready = false;
  player2Ready = false;

  currentRound = 1;
  totalRounds = 5;
  roundResult = '';
  gameOver = false;
  gameStarted = false;

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    this.deckService.getAllDecks().subscribe({
      next: (decks) => (this.decks = decks),
      error: (err) => console.error('Erreur chargement decks', err)
    });
  }

  startGame(): void {
    if (!this.selectedPlayer1DeckId || !this.selectedPlayer2DeckId) {
      alert('Veuillez sélectionner un deck pour chaque joueur.');
      return;
    }

    this.deckService.getDeck(this.selectedPlayer1DeckId).subscribe({
      next: deck => {
        this.player1DeckCards = [...deck.cards];
      },
      error: err => console.error('Erreur deck joueur 1', err)
    });

    this.deckService.getDeck(this.selectedPlayer2DeckId).subscribe({
      next: deck => {
        this.player2DeckCards = [...deck.cards];
        this.gameStarted = true;
      },
      error: err => console.error('Erreur deck joueur 2', err)
    });
  }

  selectCard(player: 1 | 2, card: CardModel): void {
    if (player === 1) {
      this.player1SelectedCard = card;
      this.player1Ready = true;
    } else {
      this.player2SelectedCard = card;
      this.player2Ready = true;
    }

    if (this.player1Ready && this.player2Ready) {
      this.resolveRound();
    }
  }

  resolveRound(): void {
    const card1 = this.player1SelectedCard!;
    const card2 = this.player2SelectedCard!;

    if (card1.value > card2.value) {
      this.player1Score++;
      this.roundResult = '✅ Joueur 1 gagne ce tour !';
    } else if (card2.value > card1.value) {
      this.player2Score++;
      this.roundResult = '✅ Joueur 2 gagne ce tour !';
    } else {
      this.roundResult = '⚖️ Égalité, aucun point.';
    }

    // Supprimer les cartes jouées
    this.player1DeckCards = this.player1DeckCards.filter(c => c.id !== card1.id);
    this.player2DeckCards = this.player2DeckCards.filter(c => c.id !== card2.id);

    this.currentRound++;
    this.player1SelectedCard = null;
    this.player2SelectedCard = null;
    this.player1Ready = false;
    this.player2Ready = false;

    if (this.currentRound > this.totalRounds) {
      this.endGame();
    }
  }

  endGame(): void {
    this.gameOver = true;
    if (this.player1Score > this.player2Score) {
      this.roundResult = '🏆 Joueur 1 gagne la partie !';
    } else if (this.player2Score > this.player1Score) {
      this.roundResult = '🏆 Joueur 2 gagne la partie !';
    } else {
      this.roundResult = '🤝 Égalité parfaite. Aucun gagnant.';
    }
  }

  restartGame(): void {
    this.selectedPlayer1DeckId = '';
    this.selectedPlayer2DeckId = '';
    this.player1DeckCards = [];
    this.player2DeckCards = [];
    this.player1Score = 0;
    this.player2Score = 0;
    this.currentRound = 1;
    this.roundResult = '';
    this.gameOver = false;
    this.gameStarted = false;
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/assets/cards/default.png';
  }

}
