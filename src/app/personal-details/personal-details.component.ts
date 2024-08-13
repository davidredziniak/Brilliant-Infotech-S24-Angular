import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  personalForm: FormGroup;
  httpOptions: { headers: HttpHeaders };
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private fb: FormBuilder, private storage: StorageService) {
    // Require form group to have all input fields
    this.personalForm = this.fb.group({
      occupation: ['', Validators.required],
      hobbies: ['', Validators.required],
      visited: ['', Validators.required],
      artist: ['', Validators.required],
      musician: ['', Validators.required]
    });
    this.httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.storage.getToken() }) };

  }

  // Function that is called when user submits the form
  onSubmit() {
    const { occupation, hobbies, visited, artist, musician } = this.personalForm.value;

    // Check if any required fields are empty
    if (occupation === "" || hobbies === "" || visited === "" || artist === "" || musician === ""){
      alert("All required fields must be filled out.");
    } else {
      this.http.post<any>(this.apiUrl + "/personal", { occupation, hobbies, visited, artist, musician }, this.httpOptions).subscribe({
        next: res => {
          alert(res.message);
        },
        error: err => {
          alert(err.error.message);
        }
      });
    }
  }

}
