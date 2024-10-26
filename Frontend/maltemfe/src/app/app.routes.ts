import { Routes } from '@angular/router';
import { deactivateGuard } from '../guards/deactivate.guard';
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
    canDeactivate: [deactivateGuard],
  },
  {
    path: 'cafe',
    component: CafeComponent,
    canDeactivate: [deactivateGuard],
  },
  { path: '**', redirectTo: '/cafes' },
];
