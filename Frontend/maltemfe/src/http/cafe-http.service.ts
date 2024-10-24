import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONFIG } from '../config/config.service';
import { ICafe } from '../models/cafe.model';

@Injectable({
  providedIn: 'root',
})
export class CafeHttpService {
  httpClient = inject(HttpClient);
  config = inject(CONFIG);
  baseApiUrl = this.config.apiUrl + 'cafes';

  getCafesByLocation(location: string | null) {
    let params =
      location == null
        ? new HttpParams()
        : new HttpParams({
            fromObject: {
              location: location as string,
            },
          });

    return this.httpClient.get<ICafe[]>(this.baseApiUrl, {
      params: params,
    });
  }

  createCafe(cafe: ICafe) {
    return this.httpClient.post<void>(this.baseApiUrl, cafe);
  }

  updateCafe(cafe: ICafe) {
    return this.httpClient.put<void>(this.baseApiUrl, cafe);
  }

  deleteCafe(id: string) {
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
