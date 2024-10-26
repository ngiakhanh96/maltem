import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ICafe } from '../../models/cafe.model';
import { UtilityService } from '../../services/file.service';
import { cafeActionGroup } from '../../store/action-group/cafe.action-group';
import { selectCafes } from '../../store/reducer/app.reducer';

@Component({
  selector: 'app-cafes',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cafes.component.html',
  styleUrl: './cafes.component.scss',
})
export class CafesComponent implements OnInit {
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
  columnsToDisplay = [
    ...this.dataColumnsToDisplay,
    'editAction',
    'deleteAction',
  ];
  dataSource: ICafe[] = [];
  router = inject(Router);
  store = inject(Store);
  destroyRef = inject(DestroyRef);
  utilityService = inject(UtilityService);
  private searchText$ = new Subject<string>();

  ngOnInit() {
    this.store.dispatch(cafeActionGroup.getCafes({ location: null }));
    this.store
      .pipe(select(selectCafes), takeUntilDestroyed(this.destroyRef))
      .subscribe((cafes) => {
        this.dataSource = cafes;
      });
    this.searchText$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((searchText) =>
        this.store.dispatch(cafeActionGroup.getCafes({ location: searchText }))
      );
  }

  addNewCafe() {
    this.store.dispatch(cafeActionGroup.selectCafe({ cafe: undefined }));
    this.router.navigate(['cafe']);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText$.next(value);
  }

  navigateToEmployeesPage(cafe: ICafe) {
    this.store.dispatch(cafeActionGroup.selectCafe({ cafe: cafe }));
    this.router.navigate(['employees'], { queryParams: { cafe: cafe.name } });
  }

  editCafe(cafe: ICafe) {
    this.store.dispatch(cafeActionGroup.selectCafe({ cafe: cafe }));
    this.router.navigate(['cafe']);
  }

  deleteCafe(cafe: ICafe) {
    if (confirm(`Do you want to delete this cafe ${cafe.name} ?`)) {
      this.store.dispatch(
        cafeActionGroup.deleteCafe({
          id: cafe.id as string,
          callBack: () => location.reload(),
        })
      );
    }
  }
}
