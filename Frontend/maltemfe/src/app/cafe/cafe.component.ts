import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cafe',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    JsonPipe,
    MatButtonModule,
  ],
  templateUrl: './cafe.component.html',
  styleUrl: './cafe.component.scss',
})
export class CafeComponent {
  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
    ]),
    logo: new FormControl(''),
    location: new FormControl('', [Validators.required]),
  });
  initialFormValue = this.form.getRawValue();
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
        description: 'a@gmail.com',
        logo: '12345678',
        location: 'test',
      });
      this.initialFormValue = this.form.getRawValue();
    }
  }

  submit() {
    this.isSubmitted = true;
    this.router.navigate(['cafes']);
  }

  cancel() {
    this.router.navigate(['cafes']);
  }

  hasUnsavedChanges() {
    return (
      !this.isSubmitted &&
      JSON.stringify(this.form.getRawValue()) !==
        JSON.stringify(this.initialFormValue)
    );
  }
}
