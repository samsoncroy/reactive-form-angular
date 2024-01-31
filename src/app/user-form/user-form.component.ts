import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      middleName: new FormControl('', Validators.maxLength(20)),
      age: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]$/), Validators.min(10), Validators.max(50)]),
      gender: new FormControl(''),
      address: new FormGroup({
        street: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        landmark: new FormControl('', Validators.maxLength(20)),
        city: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        state: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        zipCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(20)]),
        country: new FormControl('', [Validators.required, Validators.maxLength(20)])
      }),
      hobbies: new FormArray([
        new FormControl('', Validators.maxLength(20))
      ])
    });
  }

  get hobbies() {
    return this.userForm.get('hobbies') as FormArray;
  }

  getHobbyControl(index: number): FormControl {
    return this.hobbies.at(index) as FormControl;
  }

  addHobby() {
    this.hobbies.push(new FormControl('', Validators.maxLength(20)));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted with values:', this.userForm.value);
    } else {
      console.log('Form is invalid. Please fill in all required fields.', this.userForm.value);
    }
  }
}
