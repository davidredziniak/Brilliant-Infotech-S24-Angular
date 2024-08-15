import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.auth.currentToken$.pipe(first()).subscribe((token) => {
        this.fetchUserDetails();
      })
    }
  }

  fetchUserDetails(): void {
    if(this.auth.isAuthenticated()){
      this.userService.getUserDetails().subscribe({
        next: res => {
          this.user = res;
        },
        error: err => {
          if (typeof window !== 'undefined') {
            alert(err.error.error);
          }
        }
      });
    }
  }

}