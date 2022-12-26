import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  constructor(private http: HttpClient) {}

  getAllFaculties(data: any) {
    return this.http.post(
      `${environment.apiURL}/faculty/getAllFaculties`,
      data
    );
  }
}
