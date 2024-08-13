import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { StorageService } from "./storage.service";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {}

  // Register the user by calling the API
  register(username: string, password: string) {
    this.http.post<any>(this.apiUrl + "/register", { username, password }).subscribe({
      next: res => {
        alert("Registration successful.");
        this.router.navigate(["/login"]);
      },
      error: err => {
        alert(err.error.message);
      }
    });
  }

  // Login the user if the username and password matches a valid user
  login(username: string, password: string) {
    this.http.post<any>(this.apiUrl + "/login", { username, password }).subscribe({
      next: res => {
        this.storage.setToken(res.token);
        this.router.navigate(["/user"]);
      },
      error: err => {
        alert(err.error.message);
      }
    });
  }
}
