import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
        sessionStorage.setItem("userId", value.id); // Armazena o ID do usuário com o nome 'id'
      })
    );
  }


  signup(name: string, password: string, role: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, password, role }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
        sessionStorage.setItem("userId", value.id);
      })
    );
  }

  getUserId(): string | null {
    const userId = sessionStorage.getItem("userId");
    return userId;
  }


  getToken(): string | null {
    return sessionStorage.getItem("auth-token"); // Recupera o token do sessionStorage
  }

}
