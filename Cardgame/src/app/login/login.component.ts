import { Component, OnInit } from '@angular/core';
import { ILoginData } from '../profile/login.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { IProfile } from '../profile/profile.model';
import { LogUserService } from '../log-user.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  credentials: ILoginData = {
    name:'',
    password: ''
  };

  message = '';
  profile?: IProfile;
authService: any;
LogUserService: any;


    constructor(
    public logUserService: LogUserService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    try {
      const decoded: any = token ? jwtDecode(token) : null;

    } catch (err) {
      // Token invalide, on ne redirige pas
      console.warn('Token invalide, restez sur /login');
    }
  }
  onLogin(): void {
    console.log('name envoyé :', this.credentials.name);
    console.log('Password envoyé :', this.credentials.password);
    this.logUserService.login(this.credentials).subscribe({
      next: (response: { token: string }) => {
        this.message = 'Connexion réussie ';
        console.log('Token reçu :', response.token);

        // Stocker le token dans le localStorage
        localStorage.setItem('authToken', response.token);


        const decodedToken: any = jwtDecode(response.token);
        const profileId = decodedToken.id;
        this.router.navigate(['/plateau']);
      },
      error: (err: any) => {
        this.message = 'Erreur de connexion';
        console.error(err);
      }
    });
  }


}

