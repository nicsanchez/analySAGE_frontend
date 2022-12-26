import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StratumService {
  constructor(private http: HttpClient) {}

  getAllStratums(data: any) {
    return this.http.post(`${environment.apiURL}/stratum/getAllStratums`, data);
  }
}
