import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface LoginModel {
  login: string;
  password: string;
}

interface TokenModel {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(loginData: LoginModel): Observable<void> {
    return this.http.post<TokenModel>(`${environment.ssoUrl}/login`, loginData).pipe(
      tap(response => {
        this.saveToken(response.token);
      }),
      map(() => {})
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  refreshToken(profileId: string): Observable<void> {
    return this.http.get<TokenModel>(`${environment.ssoUrl}/token/${profileId}`).pipe(
      tap(response => {
        this.saveToken(response.token);
      }),
      map(() => {})
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  register(data: any) {
    return this.http.post('/api/auth/register', data);
  }

}
