import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IHasUnsavedChanges } from '../../guards/deactivate.guard';
import { ICafe } from '../../models/cafe.model';
import { IEmployee } from '../../models/employee.model';
import { cafeActionGroup } from '../../store/action-group/cafe.action-group';
import { employeeActionGroup } from '../../store/action-group/employee.action-group';
import { selectCafes, selectEmployee } from '../../store/reducer/app.reducer';
import { singaporePhoneNumberValidatorFn } from '../../validators/singapore-phone-number.validator';
import { ErrorComponent } from '../error/error.component';

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
    MatButtonModule,
    MatSelectModule,
    ErrorComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, IHasUnsavedChanges {
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
      name: '',
    } as ICafe,
  ];
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  isSubmitted = false;
  mode: 'Add' | 'Edit' = 'Add';
  employee?: IEmployee;
  cafe: string | null = null;

  ngOnInit() {
    this.cafe = this.route.snapshot.queryParamMap.get('cafe')!;
    this.store.dispatch(cafeActionGroup.getCafes({ location: null }));
    this.store
      .pipe(select(selectCafes), takeUntilDestroyed(this.destroyRef))
      .subscribe((cafes) => {
        this.cafes = this.cafes.concat(cafes);
        if (this.cafe) {
          this.form.patchValue({
            cafe: this.cafe,
          });
          this.initialFormValue.cafe = this.cafe;
        }
      });
    this.store
      .pipe(select(selectEmployee), takeUntilDestroyed(this.destroyRef))
      .subscribe((employee) => {
        if (employee != null) {
          this.form.patchValue({
            name: employee.name,
            email_address: employee.email_address,
            phone_number: employee.phone_number.toString(),
            gender: employee.gender.toString(),
            cafe: employee.cafe,
          });
          this.initialFormValue = this.form.getRawValue();
          this.mode = 'Edit';
          this.employee = employee;
        }
      });
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.isSubmitted = true;
    const formValue = this.form.getRawValue();
    const employee = <IEmployee>{
      id: this.employee?.id ?? '',
      name: formValue.name,
      email_address: formValue.email_address,
      phone_number: +formValue.phone_number!,
      gender: +formValue.gender!,
      days_worked: 0,
      cafe: formValue.cafe,
    };
    if (this.mode === 'Add') {
      this.store.dispatch(
        employeeActionGroup.createEmployee({
          employee,
          callBack: () =>
            this.router.navigate(['employees'], {
              queryParams: { cafe: this.cafe },
            }),
        })
      );
    } else {
      this.store.dispatch(
        employeeActionGroup.updateEmployee({
          employee,
          callBack: () =>
            this.router.navigate(['employees'], {
              queryParams: { cafe: this.cafe },
            }),
        })
      );
    }
  }

  cancel() {
    this.router.navigate(['employees'], {
      queryParams: { cafe: this.cafe },
    });
  }

  hasUnsavedChanges() {
    return (
      !this.isSubmitted &&
      JSON.stringify(this.form.getRawValue()) !==
        JSON.stringify(this.initialFormValue)
    );
  }
}
