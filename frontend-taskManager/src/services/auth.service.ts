import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/v1/user/login';
  private usersUrl = 'http://localhost:3000/api/v1/user';
  private authToken = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    return this.http
      .post<any>(this.loginUrl, { email, password }, httpOptions)
      .pipe(
        tap((response) => {
          this.setToken(response.jwtToken);
        }),
        catchError(this.handleError)
      );
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.authToken.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): Observable<boolean> {
    return this.authToken.asObservable().pipe(map((token: any) => !!token));
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authToken.next(null);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    // Log the error to the console (could also log to a remote server)
    console.error('An error occurred:', error);
    // Rethrow the error so that it can be handled by the component
    return throwError(error);
  }
}
