import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  public headers = {};
  constructor(private http: HttpClient) {}

  saveAttachments(data: any, configurationService: ConfigurationService) {
    const token = localStorage.getItem('token');
    configurationService.headers = {
      Authorization: `Bearer ${token}`,
    };
    return configurationService.http.post(
      `${environment.apiURL}/municipality/storeMunicipalities`,
      data,
      { headers: configurationService.headers }
    );
  }
}
