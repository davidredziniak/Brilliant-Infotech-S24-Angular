import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Login the user if the username and password matches a valid user
  login(username: string, password: string): boolean {
    if (username === 'david' && password === 'david') {
      this.router.navigate(['/user-details']);
      return true;
    } else {
      return false;
    }
  }
}
