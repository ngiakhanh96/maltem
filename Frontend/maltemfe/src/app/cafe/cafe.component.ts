import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { select, Store } from '@ngrx/store';
import { ICafe } from '../../models/cafe.model';
import { cafeActionGroup } from '../../store/action-group/cafe.action-group';
import { selectCafe } from '../../store/reducer/app.reducer';

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
export class CafeComponent implements OnInit {
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
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  isSubmitted = false;
  mode: 'Add' | 'Edit' = 'Add';
  cafe?: ICafe;
  ngOnInit() {
    this.store
      .pipe(select(selectCafe), takeUntilDestroyed(this.destroyRef))
      .subscribe((cafe) => {
        if (cafe != null) {
          this.form.patchValue({
            name: cafe.name,
            description: cafe.description,
            logo: cafe.logo,
            location: cafe.location,
          });
          this.initialFormValue = this.form.getRawValue();
          this.mode = 'Edit';
          this.cafe = cafe;
        }
      });
  }

  submit() {
    this.isSubmitted = true;
    const formValue = this.form.getRawValue();
    const cafe = <ICafe>{
      id: this.cafe?.id ?? null,
      logo: formValue.logo,
      name: formValue.name,
      description: formValue.description,
      location: formValue.location,
      employees: 0,
    };
    if (this.mode === 'Add') {
      this.store.dispatch(
        cafeActionGroup.createCafe({
          cafe,
          callBack: () => this.router.navigate(['cafes']),
        })
      );
    } else {
      this.store.dispatch(
        cafeActionGroup.updateCafe({
          cafe,
          callBack: () => this.router.navigate(['cafes']),
        })
      );
    }
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
