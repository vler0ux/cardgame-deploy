import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';
import { IProfile } from '../profile/profile.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  profile: IProfile = {
    name: '',
    email: '',
    password: '',
    login: undefined
  }

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
