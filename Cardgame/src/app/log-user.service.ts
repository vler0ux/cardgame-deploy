import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginData } from './profile/login.model';

@Injectable({
  providedIn: 'root'
})
export class LogUserService {
isLoggedIn(): boolean  {
  return !!localStorage.getItem('authToken');
}
  private apiUrl = 'http://localhost:3010/api/login';

  constructor(private http: HttpClient) {}

  login(credentials: ILoginData): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, credentials);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
