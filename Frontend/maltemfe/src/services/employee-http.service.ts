import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG } from '../app/app.config';
import { IEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeHttpService {
  httpClient = inject(HttpClient);
  config = inject(CONFIG);
  baseApiUrl = this.config.apiUrl + 'employees';

  getEmployeesByCafeName(cafe: string) {
    let params =
      cafe == null
        ? new HttpParams()
        : new HttpParams({
            fromObject: {
              cafe: cafe as string,
            },
          });

    return this.httpClient.get<IEmployee[]>(this.baseApiUrl, {
      params: params,
    });
  }

  createEmployee(employee: IEmployee) {
    return this.httpClient.post<void>(this.baseApiUrl, employee);
  }

  updateEmployee(employee: IEmployee) {
    return this.httpClient.put<void>(this.baseApiUrl, employee);
  }

  deleteEmployee(id: string) {
    let params = new HttpParams({
      fromObject: {
        id: id,
      },
    });

    return this.httpClient.delete<void>(this.baseApiUrl, {
      params: params,
    });
  }
}
