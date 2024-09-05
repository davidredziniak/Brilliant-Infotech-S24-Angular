import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../_services/user.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
	type: string;
	message: string;
}
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlert],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})

export class UserDetailsComponent {
  contactForm: FormGroup;
  alerts: Alert[] = [];

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

  close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}

  // Called when user submits the form
  onSubmit() {
    const { firstName, lastName, email, phoneNumber, addressOne, addressTwo, city, state, zip, country } = this.contactForm.value;

    // Check if any required fields are empty
    if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || addressOne === "" || city === "" || state === "" || zip === "" || country === ""){
      let alert: Alert = {
        type: 'warning',
        message: 'All required fields must be filled out.'
      };
      this.alerts.push(alert);
    } else {
      
      // API call to submit user details
      this.http.post<any>(this.apiUrl + "/user", { firstName, lastName, email, phoneNumber, addressOne, addressTwo, city, state, zip, country }).subscribe({
        next: () => {
          this.router.navigate(['/personal']);
        },
        error: err => {
          let alert: Alert = {
            type: 'danger',
            message: err.error.message
          };
          this.alerts.push(alert);
        }
      });
    }
  }
}
