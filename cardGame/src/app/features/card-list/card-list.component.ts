import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf} from '@angular/common';
import { CardModel,CardService } from '../../core/services/card.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule,NgIf,NgFor],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent  {
  @Input() cards: CardModel[] = [];
  @Output() edit = new EventEmitter<CardModel>();
  @Output() delete = new EventEmitter<string>();

  onEdit(card: CardModel): void {
    this.edit.emit(card);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/cards/default.png';
  }

}
