import { createActionGroup, props } from '@ngrx/store';
import { IEmployee } from '../../models/employee.model';

export const employeeActionGroup = createActionGroup({
  source: 'Employee',
  events: {
    getEmployees: props<{ cafe: string }>(),
    getEmployeesSuccessfully: props<{ employees: IEmployee[] }>(),
    createEmployee: props<{ employee: IEmployee; callBack: () => void }>(),
    updateEmployee: props<{ employee: IEmployee; callBack: () => void }>(),
    deleteEmployee: props<{ id: string; callBack: () => void }>(),
    selectEmployee: props<{ employee: IEmployee }>(),
  },
});
