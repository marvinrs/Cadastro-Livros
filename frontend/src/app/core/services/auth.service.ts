import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models';

interface LoginResponse {
  user: Usuario;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/register`, data)
      .pipe(
        tap(response => {
          this.saveToken(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          this.clearToken();
          this.currentUserSubject.next(null);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  checkToken(): void {
    if (this.isAuthenticated()) {
      this.http.get<Usuario>(`${environment.apiUrl}/me`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.clearToken()
      });
    }
  }

  hasRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    return user ? roles.includes(user.role!) : false;
  }
}
