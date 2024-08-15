import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  isLoggedIn: boolean = false;

  private currentTokenSubject: BehaviorSubject<string | null>;
  public currentToken$: Observable<string | null>;

  constructor(private http: HttpClient, private router: Router) {
      let storageToken: string | null = null;
      const token = localStorage.getItem('token');
      if (token) {
        storageToken = token;
      }
      this.currentTokenSubject = new BehaviorSubject<string | null>(storageToken);
      this.currentToken$ = this.currentTokenSubject.asObservable();
  }

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
        this.isLoggedIn = true;
        this.currentTokenSubject.next(res.token);
        localStorage.setItem("token", res.token);
        this.router.navigate([res.redirect]);
      },
      error: err => {
        this.isLoggedIn = false;
        alert(err.error.message);
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.currentTokenSubject.next(null);
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
