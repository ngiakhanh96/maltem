import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

export interface IEmployee {
  id: string;
  name: string;
  email_address: string;
  phone_number: number;
  gender: Gender;
  days_worked: number;
  cafe: string;
}

export enum Gender {
  Male = 0,
  Female = 1,
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  router = inject(Router);
  dataColumnsToDisplay: string[] = [
    'id',
    'name',
    'email_address',
    'phone_number',
    'days_worked',
    'cafe',
  ];

  columnHeadersMap: Record<string, string> = {
    id: 'Employee id',
    name: 'Name',
    email_address: 'Name',
    phone_number: 'Name',
    days_worked: 'Days worked in the cafe',
    cafe: 'Cafe name',
  };

  columnsToDisplay = [...this.dataColumnsToDisplay, 'action'];
  dataSource: IEmployee[] = [
    {
      id: 'testss',
      name: 'ss',
      email_address: 'ss',
      phone_number: 2222,
      days_worked: 1,
      cafe: 'test',
      gender: Gender.Male,
    },
  ];

  addNewEmployee() {
    this.router.navigate(['employee']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  editEmployee(id: string) {
    this.router.navigate(['employee'], {
      queryParams: { id: id },
    });
  }
}
