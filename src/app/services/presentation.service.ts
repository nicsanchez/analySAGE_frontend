import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PresentationService {
  public headers = {};
  constructor(private http: HttpClient) {}

  getAdmittedOrUnAdmittedPeople(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getAdmittedOrUnAdmittedPeople`,
      data,
      { headers: presentationService.headers }
    );
  }
}
