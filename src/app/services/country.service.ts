import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  getAllCountriesByContinent(data: any) {
    return this.http.post(
      `${environment.apiURL}/country/getAllCountriesByContinent`,
      data
    );
  }
}
