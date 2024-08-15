import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + "/user";
  currentToken: any;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.currentToken$.subscribe(value => this.currentToken = value);
  }

  getUserDetails(): Observable<any> {
    console.log(this.currentToken);
    return this.http.get<any>(this.apiUrl, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.currentToken }) });
  }
}