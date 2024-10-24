import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ICafe } from '../../models/cafe.model';

@Component({
  selector: 'app-cafes',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cafes.component.html',
  styleUrl: './cafes.component.scss',
})
export class CafesComponent {
  dataColumnsToDisplay: string[] = [
    'logo',
    'name',
    'description',
    'employees',
    'location',
  ];
  columnHeadersMap: Record<string, string> = {
    logo: 'Logo',
    name: 'Name',
    description: 'Description',
    employees: 'Employees',
    location: 'Location',
  };
  columnsToDisplay = [...this.dataColumnsToDisplay, 'action'];
  dataSource: ICafe[] = [
    {
      id: 'testss',
      logo: 'ss',
      name: 'ss',
      description: 'ss',
      employees: 2,
      location: 'test',
    },
  ];
  router = inject(Router);
  addNewCafe() {
    this.router.navigate(['cafe']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  editCafe(id: string) {
    this.router.navigate(['cafe'], {
      queryParams: { id: id },
    });
  }
}
