import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IProfile } from './profile/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:3010/api/profiles';

  constructor(private http: HttpClient) {}

  createProfile(profile: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, profile);
  }

  getProfileById(id: string): Observable<IProfile> {
    return this.http.get<IProfile>(`${this.apiUrl}/${id}`);
  }

}
