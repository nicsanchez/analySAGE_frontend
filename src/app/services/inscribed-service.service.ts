import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InscribedService {
  public headers = {};
  constructor(private http: HttpClient) {}

  saveAttachments(data: any, inscribedService: InscribedService) {
    const token = localStorage.getItem('token');
    inscribedService.headers = {
      Authorization: `Bearer ${token}`,
    };
    return inscribedService.http.post(
      `${environment.apiURL}/inscribed/storeInscribedBySemester`,
      data,
      { headers: inscribedService.headers }
    );
  }
}
