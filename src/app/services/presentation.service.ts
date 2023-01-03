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

  getDetailsAdmittedOrUnAdmittedPeopleByVersion(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAdmittedOrUnAdmittedPeopleByVersion`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAdmittedOrUnAdmittedPeopleByState(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAdmittedOrUnAdmittedPeopleByState`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAdmittedOrUnAdmittedPeopleByStratum(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAdmittedOrUnAdmittedPeopleByStratum`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAdmittedOrUnAdmittedPeopleByProgram(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAdmittedOrUnAdmittedPeopleByProgram`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAdmittedOrUnAdmittedPeopleByRegistrationType(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAdmittedOrUnAdmittedPeopleByRegistrationType`,
      data,
      { headers: presentationService.headers }
    );
  }

  getAverageExamComponent(data: any, presentationService: PresentationService) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getAverageExamComponent`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAverageExamComponentByVersion(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAverageExamComponentByVersion`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAverageExamComponentByState(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAverageExamComponentByState`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAverageExamComponentByStratum(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAverageExamComponentByStratum`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAverageExamComponentByProgram(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAverageExamComponentByProgram`,
      data,
      { headers: presentationService.headers }
    );
  }

  getDetailsAverageExamComponentByRegistrationType(
    data: any,
    presentationService: PresentationService
  ) {
    const token = localStorage.getItem('token');
    presentationService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return presentationService.http.post(
      `${environment.apiURL}/statistics/getDetailsAverageExamComponentByRegistrationType`,
      data,
      { headers: presentationService.headers }
    );
  }
}
