import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public storeJwtToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  public getJwtToken() {
    return localStorage.getItem('jwt');
  }

  public clearJwtToken() {
    localStorage.removeItem('jwt');
  }
}
