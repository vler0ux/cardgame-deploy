import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,CardComponent],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent {
  @Input() theme: 'hack-animaux' | 'bestioles-bureau' = 'hack-animaux';
  cards: any[] = [];

  ngOnInit(): void {
    this.cards = this.getCardsByTheme(this.theme);
  }

  getCardsByTheme(theme: string) {
    if (theme === 'hack-animaux') {
      return [
        { title: 'Cryptochat', image: 'cryptochat.png', description: 'Crypte les échanges.', power: 6 },
        { title: 'RootLion', image: 'rootlion.png', description: 'Contrôle total du système.', power: 8 },
        { title: 'Firewall Doggo', image: 'doggo.png', description: 'Bloque les attaques.', power: 5 },
        { title: 'TigerTrace', image: 'tigertrace.png', description: 'Repère les failles.', power: 7 },
        { title: 'ZeroDay Wolf', image: 'zeroday.png', description: 'Exploit inconnu.', power: 4 },
      ];
    } else if (theme === 'bestioles-bureau') {
      return [
        { title: 'Cafard de la cafetière', image: 'cafard.png', description: 'Booste ton énergie... ou pas.', power: 4 },
        { title: 'Araignée de clavier', image: 'araignee.png', description: 'Tisse des bugs dans ton code.', power: 6 },
        { title: 'Mouche du rétroprojecteur', image: 'mouche.png', description: 'Distrait tout le monde.', power: 3 },
        { title: 'Punaise de réunion', image: 'punaise.png', description: 'Interrompt la stratégie ennemie.', power: 7 },
        { title: 'Fourmi RH', image: 'fourmi.png', description: 'Gère tous les conflits.', power: 5 },
      ];
    }
    return [];
  }

}
