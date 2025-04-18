import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogUserService } from '../log-user.service';

@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent {

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
