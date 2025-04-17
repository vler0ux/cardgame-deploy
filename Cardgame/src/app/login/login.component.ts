import { Component } from '@angular/core';
import { LogUserService } from '../log-user.service';
import { ILoginData } from '../profile/login.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: ILoginData = {
    login: '',
    password: ''
  };

  message = '';
  authService: any;
  constructor(private logUserService: LogUserService) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (response: { token: any; }) => {
        this.message = 'Connexion réussie ';
        console.log('Token reçu :', response.token);
        // tu peux stocker le token ici (localStorage, etc.)
      },
      error: (err: any) => {
        this.message = 'Erreur de connexion ';
        console.error(err);
      }
    });
  }

}
