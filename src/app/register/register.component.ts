import { Component } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    // Require form group to have username and password filled
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      confirm: ["", Validators.required],
    });
  }

  // Function that is called when user submits the form
  onSubmit(): boolean {
    const { username, password, confirm } = this.registerForm.value;

    // Check if any fields are empty
    if (username === "" || password === "" || confirm === "") {
      alert("All fields must be filled out.");
      return false;
    }

    if (password !== confirm) {
      alert("Password and confirm password must match.");
      return false;
    }

    // Try to register a new user
    this.auth.register(username, password);

    return true;
  }
}
