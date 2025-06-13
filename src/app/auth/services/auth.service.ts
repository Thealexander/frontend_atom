import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { IPayload } from 'src/app/interfaces/payload.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.endpoint}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  signin(email: string): Observable<{ user: IUser; token: string }> {
    return this.http.post<{ user: IUser; token: string }>(
      `${this.apiUrl}/signin`,
      { email }
    );
  }

  signup(data: {
    email: string;
    name: string;
    lastname: string;
  }): Observable<{ user: IUser; token: string }> {
    return this.http.post<{ user: IUser; token: string }>(
      `${this.apiUrl}/signup`,
      data
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  logout(): void {
    localStorage.removeItem('auth-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): IPayload | null {
    const token = localStorage.getItem('auth-token');
    if (!token)  {
      this.router.navigate(['/']);
      return null;
    }

    try {
      const payload: IPayload = JSON.parse(atob(token.split('.')[1]));

      // Verifica expiracion
      const now = Math.floor(Date.now() / 1000); // tiempo en segundos
      if (payload.exp && payload.exp < now) {
        console.warn('Token expired');
        this.logout(); // eliminar token si expiro
        return null;
      }

      return payload;
    } catch (error) {
      console.error('Invalid token payload:', error);
      return null;
    }
  }
}
