import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogUserService } from '../log-user.service';
import { DeckComponent } from "../deck/deck.component";


@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, DeckComponent],
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent {
  @Input() theme: 'hack-animaux' | 'bestioles-bureau' = 'hack-animaux';

  constructor(
    public logUserService: LogUserService,
    private router: Router,
  ) {}
  message = '';

  onLogout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


}
