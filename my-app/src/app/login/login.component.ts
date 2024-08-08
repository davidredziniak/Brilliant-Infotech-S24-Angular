import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    // Require form group to have username and password filled
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Function that is called when user submits the form
  onSubmit() {
    const { username, password } = this.loginForm.value;

    // Check if any fields are empty
    if (username === "" || password === ""){
      alert("All fields must be filled out.");
    }

    // Check if user is not authenticated
    if (!this.auth.login(username, password)) {
      alert("Failed to sign in, incorrect username and password.");
    }
  }
}
