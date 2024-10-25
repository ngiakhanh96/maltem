import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IEmployee } from '../../models/employee.model';
import { employeeActionGroup } from '../../store/action-group/employee.action-group';
import { selectEmployees } from '../../store/reducer/app.reducer';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent implements OnInit {
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

  columnsToDisplay = [
    ...this.dataColumnsToDisplay,
    'editAction',
    'deleteAction',
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
