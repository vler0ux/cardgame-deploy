import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { IProfile } from '../profile/profile.model';
import { ILoginData } from '../profile/login.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  profile: IProfile = {
    name: '',
    email: '',
    password: ''
  };

  message = '';

  constructor(private profileService: ProfileService) {}

  onSubmit() {
    this.profileService.createProfile(this.profile).subscribe({
      next: (res) => {
        this.message = 'Profil créé avec succès ';
        console.log(res);
      },
      error: (err) => {
        this.message = 'Erreur lors de la création ';
        console.error(err);
      }
    });
  }

}
