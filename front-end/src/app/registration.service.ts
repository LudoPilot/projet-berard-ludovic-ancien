import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registerUrl = 'http://localhost:8000/api/utilisateur/register'; // à remplacer plus tard

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(this.registerUrl, userData);
  }
}
