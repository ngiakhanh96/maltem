import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ICafe } from '../../models/cafe.model';
import { UtilityService } from '../../services/utility.service';
import { cafeActionGroup } from '../../store/action-group/cafe.action-group';
import { selectCafes } from '../../store/reducer/app.reducer';
import { ButtonCellComponent } from '../button-cell/button-cell.component';
import { LogoCellComponent } from '../logo-cell/logo-cell.component';

@Component({
  selector: 'app-cafes',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AgGridAngular,
  ],
  templateUrl: './cafes.component.html',
  styleUrl: './cafes.component.scss',
})
export class CafesComponent implements OnInit {
  colDefs: ColDef[] = [
    {
      field: 'logo',
      cellRenderer: LogoCellComponent
    },
    { field: 'name' },
    { field: 'description' },
    {
      field: 'employees',
      onCellClicked: (event) => {
        this.navigateToEmployeesPage(event.data);
      },
    },
    { field: 'location' },
    {
      headerName: '',
      field: 'editAction',
      cellRenderer: ButtonCellComponent,
      cellRendererParams: {
        click: (cafe: ICafe) => this.editCafe(cafe),
        text: 'Edit',
      },
    },
    {
      headerName: '',
      field: 'deleteAction',
      cellRenderer: ButtonCellComponent,
      cellRendererParams: {
        click: (cafe: ICafe) => this.deleteCafe(cafe),
        text: 'Delete',
      },
    },
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
