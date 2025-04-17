import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogUserService {

  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {}

  logUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
