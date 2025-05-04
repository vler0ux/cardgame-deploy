import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardService, CardModel } from '../../core/services/card.service';
import { CardListComponent} from '../card-list/card-list.component';

@Component({
  selector: 'app-card-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardListComponent],
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.scss'],
})
export class CardManagerComponent implements OnInit {
  cards: CardModel[] = [];
  loading = true;
  errorMessage = '';

  form: FormGroup;
  isEditing = false;
  editingCardId: string | null = null;

  constructor(private fb: FormBuilder, private cardService: CardService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.cardService.getCards().subscribe({
      next: data => {
        this.cards = data;
        this.loading = false;
      },
      error: err => {
        this.errorMessage = 'Erreur lors du chargement des cartes';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.isEditing && this.editingCardId) {
      const updatedCard: CardModel = {
        id: this.editingCardId,
        name: formValue.name,
        value: formValue.value
      };
      this.cardService.updateCard(updatedCard).subscribe({
        next: card => {
          const index = this.cards.findIndex(c => c.id === card.id);
          if (index !== -1) this.cards[index] = card;
          this.resetForm();
        },
        error: () => this.errorMessage = 'Échec de la mise à jour'
      });
    } else {
      const newCard: Partial<CardModel> = {
        name: formValue.name,
        value: formValue.value
      };
      this.cardService.createCard(newCard).subscribe({
        next: card => {
          this.cards.push(card);
          this.resetForm();
        },
        error: () => this.errorMessage = 'Échec de la création'
      });
    }
  }

  editCard(card: CardModel): void {
    this.isEditing = true;
    this.editingCardId = card.id || null;
    this.form.patchValue({ name: card.name, value: card.value });
  }

  deleteCard(id: string): void {
    this.cardService.deleteCard(id).subscribe({
      next: () => {
        this.cards = this.cards.filter(c => c.id !== id);
      },
      error: () => this.errorMessage = 'Erreur lors de la suppression'
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({ name: '', value: 0 });
    this.isEditing = false;
    this.editingCardId = null;
    this.errorMessage = '';
  }
}
