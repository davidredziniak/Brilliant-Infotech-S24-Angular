import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Require form group to have all input fields
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['United States', Validators.required]
    });
  }

  // Function that is called when user submits the form
  onSubmit() {
    const { firstName, lastName, email, phoneNumber, addressOne, addressTwo, city, state, zip, country } = this.contactForm.value;

    // Check if any required fields are empty
    if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || addressOne === "" || city === "" || state === "" || zip === "" || country === ""){
      alert("All required fields must be filled out.");
    } else {
      // Redirect since all fields are filled out
      this.router.navigate(['/personal']);
    }
  }
}
