import { Routes } from '@angular/router';
import { CafeComponent } from './cafe/cafe.component';
import { CafesComponent } from './cafes/cafes.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'cafes', component: CafesComponent },
  {
    path: 'employee',
    component: EmployeeComponent,
    canDeactivate: [
      (component: EmployeeComponent) => {
        if (!component.hasUnsavedChanges()) {
          return true;
        }
        if (
          confirm('There are unsaved changes. Are you sure to leave this page?')
        ) {
          return true;
        }
        return false;
      },
    ],
  },
  {
    path: 'cafe',
    component: CafeComponent,
    canDeactivate: [
      (component: CafeComponent) => {
        if (!component.hasUnsavedChanges()) {
          return true;
        }
        if (
          confirm('There are unsaved changes. Are you sure to leave this page?')
        ) {
          return true;
        }
        return false;
      },
    ],
  },
  { path: '**', redirectTo: '/employee' },
];
