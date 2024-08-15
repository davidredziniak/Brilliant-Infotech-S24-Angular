import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  contactForm: FormGroup;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private user: UserService) {
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
      // API call to submit user details
      this.http.post<any>(this.apiUrl + "/user", { firstName, lastName, email, phoneNumber, addressOne, addressTwo, city, state, zip, country }, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.user.currentToken })}).subscribe({
        next: res => {
          alert(res.message);
          this.router.navigate(['/personal']);
        },
        error: err => {
          alert(err.error.message);
        }
      });
    }
  }
}
