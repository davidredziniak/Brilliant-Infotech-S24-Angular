import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

interface Alert {
	type: string;
	message: string;
}
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlert],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  personalForm: FormGroup;
  alerts: Alert[] = [];

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private user: UserService) {
    // Require form group to have all input fields
    this.personalForm = this.fb.group({
      occupation: ['', Validators.required],
      hobbies: ['', Validators.required],
      visited: ['', Validators.required],
      artist: ['', Validators.required],
      musician: ['', Validators.required]
    });

  }

  close(alert: Alert) {
		this.alerts.splice(this.alerts.indexOf(alert), 1);
	}

  // Function that is called when user submits the form
  onSubmit() {
    const { occupation, hobbies, visited, artist, musician } = this.personalForm.value;

    // Check if any required fields are empty
    if (occupation === "" || hobbies === "" || visited === "" || artist === "" || musician === ""){
      let alert: Alert = {
        type: 'warning',
        message: 'All required fields must be filled out.'
      };
      this.alerts.push(alert);
    } else {
      // API call to submit personal details for user
      this.http.post<any>(this.apiUrl + "/personal", { occupation, hobbies, visited, artist, musician }).subscribe({
        next: () => {
          this.router.navigate(['/home']);
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
