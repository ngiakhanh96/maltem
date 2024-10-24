import { createFeature, createReducer, on } from '@ngrx/store';
import { ICafe } from '../../models/cafe.model';
import { IEmployee } from '../../models/employee.model';
import { cafeActionGroup } from '../action-group/cafe.action-group';
import { employeeActionGroup } from '../action-group/employee.action-group';

export const appStateName = 'app';
export interface IAppState {
  employees: IEmployee[];
  employee: IEmployee | undefined;
  cafes: ICafe[];
  cafe: ICafe | undefined;
}
export const initialAppState: IAppState = {
  employees: [],
  employee: undefined,
  cafes: [],
  cafe: undefined,
};

const reducer = createReducer(
  initialAppState,
  on(cafeActionGroup.getCafes, (state) => ({
    ...state,
    cafes: [],
  })),
  on(cafeActionGroup.getCafesSuccessfully, (state, { cafes }) => ({
    ...state,
    cafes: cafes,
  })),
  on(cafeActionGroup.selectCafe, (state, { cafe }) => ({
    ...state,
    cafe: cafe,
  })),
  on(employeeActionGroup.getEmployees, (state) => ({
    ...state,
    employees: [],
  })),
  on(employeeActionGroup.getEmployeesSuccessfully, (state, { employees }) => ({
    ...state,
    employees: employees,
  })),
  on(employeeActionGroup.selectEmployee, (state, { employee }) => ({
    ...state,
    employee: employee,
  }))
);

export const {
  reducer: appReducer,
  selectAppState,
  selectEmployee,
  selectEmployees,
  selectCafe,
  selectCafes,
} = createFeature<string, IAppState>({
  name: appStateName,
  reducer: reducer,
});
