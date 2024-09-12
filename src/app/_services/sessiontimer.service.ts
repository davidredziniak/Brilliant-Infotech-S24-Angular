import { Injectable, NgZone } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

interface Alert {
  type: string;
  message: string;
}

@Injectable({
  providedIn: "root",
})
export class SessiontimerService {
  private timeout: NodeJS.Timeout | number | null = null;
  private expiration = 1800000; // 30mins

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private auth: AuthService
  ) {
    this.initEventListeners();
    this.ngZone.runOutsideAngular(() => {
      this.timeout = setTimeout(() => {
        this.expire();
      }, this.expiration);
    });
  }

  // Create event listeners that will reset the timer since the user is active
  initEventListeners() {
    if (typeof window !== "undefined" && window.document) {
      window.addEventListener("mousemove", () => this.reset());
      window.addEventListener("mousedown", () => this.reset());
      window.addEventListener("touchstart", () => this.reset());
      window.addEventListener("touchmove", () => this.reset());
      window.addEventListener("click", () => this.reset());
      window.addEventListener("keydown", () => this.reset());
      window.addEventListener("scroll", () => this.reset());
      window.addEventListener("wheel", () => this.reset());
    }
  }

  // If the user is logged in, force the user to log out and alert them that the session expired
  expire() {
    if (this.auth.isLoggedIn) {
      let alert: Alert = {
        type: "success",
        message: "Session has expired, please login again.",
      };
      this.auth.alerts.push(alert);
      this.auth.logout();
      this.router.navigate(["/login"]);
    }
  }

  // Clears timeout if it exists
  // Creates a new timeout
  reset() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.expire();
    }, this.expiration);
  }
}
