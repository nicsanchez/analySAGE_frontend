import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  constructor(private http: HttpClient) {}

  getAllGenders(data: any) {
    return this.http.post(`${environment.apiURL}/gender/getAllGenders`, data);
  }
}
