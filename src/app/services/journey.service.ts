import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  constructor(private http: HttpClient) {}

  getAllJourneys(data: any) {
    return this.http.post(`${environment.apiURL}/journey/getAllJourneys`, data);
  }
}
