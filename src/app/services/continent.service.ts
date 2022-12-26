import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContinentService {
  constructor(private http: HttpClient) {}

  getAllContinents(data: any) {
    return this.http.post(
      `${environment.apiURL}/continent/getAllContinents`,
      data
    );
  }
}
