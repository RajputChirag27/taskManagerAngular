  import { Injectable } from '@angular/core';
  import {HttpClient} from '@angular/common/http'
  import { Observable } from 'rxjs';
  import { HttpHeaders } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private loginUrl = 'http://localhost:3000/api/v1/user/login';
    private isLogged = false;

    constructor(private http: HttpClient) { }
    login(email: string, password: string): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        }),
        withCredentials: true  // Add this line
      };
      this.isLogged = true;
      return this.http.post<any>(this.loginUrl, { email, password }, httpOptions);
    }
    setToken(token: string): void {
      localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
      return localStorage.getItem('authToken');
    }

    isLoggedIn(): boolean {
      return this.getToken() !== null && this.isLogged;
    }

    logout(): void {
      localStorage.removeItem('authToken');
      this.isLogged = false;
    }

    getUsers() : Observable<any>{
      return this.http.get<any>('http://localhost:3000/api/v1/user');
    }
  }
