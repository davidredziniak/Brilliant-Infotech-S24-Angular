import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

interface Alert {
	type: string;
	message: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLocalStorageAvailable = typeof localStorage !== "undefined";
  private currentTokenSubject: BehaviorSubject<string | null>;
  alerts: Alert[] = [];


  currentToken$: Observable<string | null>;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    let storageToken: string | null = null;
    
    // Update local JWT
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
        next: () => {
          let alert: Alert = {
            type: 'success',
            message: 'Registration successful.'
          };
          this.alerts.push(alert);
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          let alert: Alert = {
            type: 'danger',
            message: err.error.message
          };
          this.alerts.push(alert);
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
          let alert: Alert = {
            type: 'danger',
            message: err.error.message
          };
          this.alerts.push(alert);
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
