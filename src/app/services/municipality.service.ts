import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MunicipalityService {
  constructor(private http: HttpClient) {}

  getAllMunicipalitiesByState(data: any) {
    return this.http.post(
      `${environment.apiURL}/municipality/getAllMunicipalitiesByState`,
      data
    );
  }
}
