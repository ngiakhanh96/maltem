import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { CafeHttpService } from '../../http/cafe-http.service';
import { EmployeeHttpService } from '../../http/employee-http.service';
import { cafeActionGroup } from '../action-group/cafe.action-group';
import { employeeActionGroup } from '../action-group/employee.action-group';

export class AppEffects {
  private employeeHttpService = inject(EmployeeHttpService);
  private cafeHttpService = inject(CafeHttpService);
  private actions$ = inject(Actions);
  getEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActionGroup.getEmployees),
      switchMap((action) => {
        return this.employeeHttpService
          .getEmployeesByCafeName(action.cafe)
          .pipe(
            map((response) =>
              employeeActionGroup.getEmployeesSuccessfully({
                employees: response,
              })
            ),
            catchError(() => EMPTY)
          );
      })
    )
  );

  createEmployee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(employeeActionGroup.createEmployee),
        switchMap((action) => {
          return this.employeeHttpService
            .createEmployee(action.employee)
            .pipe(catchError(() => EMPTY));
        })
      ),
    {
      dispatch: false,
    }
  );

  updateEmployee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(employeeActionGroup.updateEmployee),
        switchMap((action) => {
          return this.employeeHttpService
            .updateEmployee(action.employee)
            .pipe(catchError(() => EMPTY));
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteEmployee$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(employeeActionGroup.deleteEmployee),
        switchMap((action) => {
          return this.employeeHttpService
            .deleteEmployee(action.id)
            .pipe(catchError(() => EMPTY));
        })
      ),
    {
      dispatch: false,
    }
  );

  getCafes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cafeActionGroup.getCafes),
      switchMap((action) => {
        return this.cafeHttpService.getCafesByLocation(action.location).pipe(
          map((response) =>
            cafeActionGroup.getCafesSuccessfully({
              cafes: response,
            })
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createCafe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cafeActionGroup.createCafe),
        switchMap((action) => {
          return this.cafeHttpService.createCafe(action.cafe).pipe(
            tap((_) => action.callBack()),
            catchError(() => EMPTY)
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  updateCafe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cafeActionGroup.updateCafe),
        switchMap((action) => {
          return this.cafeHttpService.updateCafe(action.cafe).pipe(
            tap((_) => action.callBack()),
            catchError(() => EMPTY)
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteCafe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cafeActionGroup.deleteCafe),
        switchMap((action) => {
          return this.cafeHttpService.deleteCafe(action.id).pipe(
            tap((_) => action.callBack()),
            catchError(() => EMPTY)
          );
        })
      ),
    {
      dispatch: false,
    }
  );
}
