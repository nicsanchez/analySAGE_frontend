import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  getProgramsByFaculty(data: any) {
    return this.http.post(
      `${environment.apiURL}/program/getProgramsByFaculty`,
      data
    );
  }
}
