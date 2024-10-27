import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { IEmployee } from '../../models/employee.model';
import { employeeActionGroup } from '../../store/action-group/employee.action-group';
import { selectEmployees } from '../../store/reducer/app.reducer';
import { ButtonCellComponent } from '../button-cell/button-cell.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatButtonModule, AgGridAngular],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
  colDefs: ColDef[] = [
    {
      headerName: 'Employee id',
      field: 'id',
    },
    { field: 'name' },
    {
      headerName: 'Email address',
      field: 'email_address',
    },
    {
      headerName: 'Phone number',
      field: 'phone_number',
    },
    {
      headerName: 'Days worked',
      field: 'days_worked',
    },
    {
      headerName: 'Cafe name',
      field: 'cafe',
    },
    {
      headerName: '',
      field: 'editAction',
      cellRenderer: ButtonCellComponent,
      cellRendererParams: {
        click: (employee: IEmployee) => this.editEmployee(employee),
        text: 'Edit',
      },
    },
    {
      headerName: '',
      field: 'deleteAction',
      cellRenderer: ButtonCellComponent,
      cellRendererParams: {
        click: (employee: IEmployee) => this.deleteEmployee(employee),
        text: 'Delete',
      },
    },
  ];

  dataSource: IEmployee[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  cafe: string | null = null;

  ngOnInit() {
    this.cafe = this.route.snapshot.queryParamMap.get('cafe')!;
    this.store.dispatch(employeeActionGroup.getEmployees({ cafe: this.cafe }));
    this.store
      .pipe(select(selectEmployees), takeUntilDestroyed(this.destroyRef))
      .subscribe((employees) => {
        this.dataSource = employees;
      });
  }

  addNewEmployee() {
    this.store.dispatch(
      employeeActionGroup.selectEmployee({ employee: undefined })
    );
    this.router.navigate(['employee'], { queryParams: { cafe: this.cafe } });
  }

  editEmployee(employee: IEmployee) {
    this.store.dispatch(employeeActionGroup.selectEmployee({ employee }));
    this.router.navigate(['employee'], { queryParams: { cafe: this.cafe } });
  }

  deleteEmployee(employee: IEmployee) {
    if (confirm(`Do you want to delete this employee ${employee.name} ?`)) {
      this.store.dispatch(
        employeeActionGroup.deleteEmployee({
          id: employee.id as string,
          callBack: () => location.reload(),
        })
      );
    }
  }
}
