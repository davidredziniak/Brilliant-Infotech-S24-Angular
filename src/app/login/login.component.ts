import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
	type: string;
	message: string;
}
@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgbAlert],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alerts: Alert[] = this.auth.alerts;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    // Require form group to have username and password filled
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.alerts = this.auth.alerts;
  }

  close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(["/home"]);
    }
  }

  // Function that is called when user submits the form
  onSubmit(): boolean {
    const { username, password } = this.loginForm.value;

    // Check if any fields are empty
    if (username === "" || password === "") {
      let alert: Alert = {
        type: 'warning',
        message: 'All fields must be filled out.'
      };
      this.alerts.push(alert);
      return false;
    }

    // Try to login the user
    this.auth.login(username, password);

    return true;
  }
}
