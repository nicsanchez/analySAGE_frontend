import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private http: HttpClient) {}

  getAllStatesByCountry(data: any) {
    return this.http.post(
      `${environment.apiURL}/state/getAllStatesByCountry`,
      data
    );
  }
}
