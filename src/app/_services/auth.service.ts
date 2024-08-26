import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLocalStorageAvailable = typeof localStorage !== "undefined";
  private currentTokenSubject: BehaviorSubject<string | null>;
  
  currentToken$: Observable<string | null>;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    let storageToken: string | null = null;
    const token = null;
    if (this.isLocalStorageAvailable) {
      const token = localStorage.getItem("token");
      if (token) {
        storageToken = token;
      }
    }
    this.currentTokenSubject = new BehaviorSubject<string | null>(storageToken);
    this.currentToken$ = this.currentTokenSubject.asObservable();
  }

  // Register the user by calling the API
  register(username: string, password: string) {
    this.http
      .post<any>(this.apiUrl + "/register", { username, password }, { headers: new HttpHeaders({ 'skip': 'true' })})
      .subscribe({
        next: (res) => {
          alert("Registration successful.");
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }

  // Login the user if the username and password matches a valid user
  login(username: string, password: string) {
    this.http
      .post<any>(this.apiUrl + "/login", { username, password }, { headers: new HttpHeaders({ 'skip': 'true' })})
      .subscribe({
        next: (res) => {
          this.isLoggedIn = true;
          this.currentTokenSubject.next(res.token);
          if (this.isLocalStorageAvailable)
            localStorage.setItem("token", res.token);
          this.router.navigate([res.redirect]);
        },
        error: (err) => {
          this.isLoggedIn = false;
          alert(err.error.message);
        },
      });
  }

  // Logout the user session, clear token in localStorage
  logout() {
    this.isLoggedIn = false;
    this.currentTokenSubject.next(null);
    if (this.isLocalStorageAvailable) localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }

  // Checks if token is in localstorage, returns if user is logged in
  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable) {
      const token = localStorage.getItem("token");
      if (token) {
        this.isLoggedIn = true;
      }
    }
    return this.isLoggedIn;
  }
}
