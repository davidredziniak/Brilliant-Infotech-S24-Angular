import { Component } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AuthService } from "../_services/auth.service";
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
	type: string;
	message: string;
}
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgbAlert],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm: FormGroup;
  alerts: Alert[] = this.auth.alerts;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    // Require form group to have username and password filled
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirm: ["", Validators.required],
    });
  }

  close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}

  // Function that is called when user submits the form
  onSubmit(): boolean {
    const { username, password, confirm } = this.registerForm.value;

    // Check if any fields are empty
    if (username === "" || password === "" || confirm === "") {
      let alert: Alert = {
        type: 'warning',
        message: 'All fields must be filled out.'
      };
      this.alerts.push(alert);
      return false;
    }

    if (password !== confirm) {
      let alert: Alert = {
        type: 'warning',
        message: 'Password and confirm password must match.'
      };
      this.alerts.push(alert);
      return false;
    }

    // Try to register a new user
    this.auth.register(username, password);

    return true;
  }
}
