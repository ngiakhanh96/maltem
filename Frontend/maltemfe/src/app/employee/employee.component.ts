import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ICafe } from '../../models/cafe.model';
import { Gender } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    JsonPipe,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]),
    email_address: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [
      Validators.required,
      singaporePhoneNumberValidatorFn,
    ]),
    gender: new FormControl('0', [Validators.required]),
    cafe: new FormControl(''),
  });
  initialFormValue = this.form.getRawValue();
  cafes: ICafe[] = [
    {
      id: 'test',
      logo: '',
      name: 'test',
      description: '',
      employees: 2,
      location: '',
    },
  ];
  route = inject(ActivatedRoute);
  router = inject(Router);
  isSubmitted = false;
  mode: 'Add' | 'Edit';
  constructor() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id == null) {
      this.mode = 'Add';
    } else {
      this.mode = 'Edit';
    }
    if (this.mode == 'Edit') {
      this.form.patchValue({
        name: 'test',
        email_address: 'a@gmail.com',
        phone_number: '12345678',
        gender: Gender.Female.toString(),
        cafe: 'cafe',
      });
      this.initialFormValue = this.form.getRawValue();
    }
  }

  submit() {
    this.isSubmitted = true;
    this.router.navigate(['employees']);
  }

  cancel() {
    this.router.navigate(['employees']);
  }

  hasUnsavedChanges() {
    return (
      !this.isSubmitted &&
      JSON.stringify(this.form.getRawValue()) !==
        JSON.stringify(this.initialFormValue)
    );
  }
}

export function singaporePhoneNumberValidatorFn(control: AbstractControl) {
  return /(8|9)\d{7}/g.test(control.value)
    ? null
    : { invalidPhoneNumber: { value: control.value } };
}
