import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../_services/user.service";
import { CommonModule } from "@angular/common";
import { AuthService } from "../_services/auth.service";
import { first } from "rxjs";
import { Router } from "@angular/router";
import { TimerComponent } from "../timer/timer.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
  }

  // On initialization, check if user is logged in
  // Success: Fetch user's details to be displayed
  // Fail: Redirect to login page
  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.auth.currentToken$.pipe(first()).subscribe(() => {
        this.fetchUserDetails();
      });
    } else {
      this.router.navigate(["/login"]);
    }
  }

  // Get user document with corresponding details from the MongoDB database
  fetchUserDetails(): void {
    if (this.auth.isAuthenticated()) {
      this.userService.getUserDetails().subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          if (typeof window !== "undefined") {
            alert(err.error.error);
            this.logout();
          }
        },
      });
    }
  }
}
