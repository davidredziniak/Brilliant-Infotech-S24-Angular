import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  personalForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      alert("Successfully submitted!");
    }
  }

}
