import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  constructor(private http: HttpClient) {}

  getAllSemesters(data: any) {
    return this.http.post(
      `${environment.apiURL}/semester/getAllSemesters`,
      data
    );
  }
}
