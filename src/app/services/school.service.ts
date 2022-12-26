import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  constructor(private http: HttpClient) {}

  getAllNaturalness(data: any) {
    return this.http.post(
      `${environment.apiURL}/school/getAllNaturalness`,
      data
    );
  }

  getAllSchoolsByNaturalnessAndMunicipality(data: any) {
    return this.http.post(
      `${environment.apiURL}/school/getAllSchoolsByNaturalnessAndMunicipality`,
      data
    );
  }
}
