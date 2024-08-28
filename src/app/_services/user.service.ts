import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = environment.apiUrl + "/user";
  currentToken: any;

  // Begin subscription to auth service to keep track of current JWT
  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.currentToken$.subscribe((value) => (this.currentToken = value));
  }

  // API call to fetch user details for home page
  getUserDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
