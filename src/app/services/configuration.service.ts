import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  public headers = {};
  constructor(private http: HttpClient) {}

  saveMunicipalityAttachment(
    data: any,
    configurationService: ConfigurationService
  ) {
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

  saveSchoolAttachment(data: any, configurationService: ConfigurationService) {
    const token = localStorage.getItem('token');
    configurationService.headers = {
      Authorization: `Bearer ${token}`,
    };
    return configurationService.http.post(
      `${environment.apiURL}/school/storeSchools`,
      data,
      { headers: configurationService.headers }
    );
  }

  saveProgramAttachment(data: any, configurationService: ConfigurationService) {
    const token = localStorage.getItem('token');
    configurationService.headers = {
      Authorization: `Bearer ${token}`,
    };
    return configurationService.http.post(
      `${environment.apiURL}/program/storePrograms`,
      data,
      { headers: configurationService.headers }
    );
  }
}
