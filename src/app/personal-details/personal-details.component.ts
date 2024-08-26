import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  personalForm: FormGroup;
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

  // Function that is called when user submits the form
  onSubmit() {
    const { occupation, hobbies, visited, artist, musician } = this.personalForm.value;

    // Check if any required fields are empty
    if (occupation === "" || hobbies === "" || visited === "" || artist === "" || musician === ""){
      alert("All required fields must be filled out.");
    } else {
      // API call to submit personal details for user
      this.http.post<any>(this.apiUrl + "/personal", { occupation, hobbies, visited, artist, musician }).subscribe({
        next: res => {
          alert(res.message);
          this.router.navigate(['/home']);
        },
        error: err => {
          alert(err.error.message);
        }
      });
    }
  }

}
