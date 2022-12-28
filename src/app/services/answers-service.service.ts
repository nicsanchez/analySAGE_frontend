import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnswersService {
  public headers = {};
  constructor(private http: HttpClient) {}

  saveAttachments(data: any, answersService: AnswersService) {
    const token = localStorage.getItem('token');
    answersService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return answersService.http.post(
      `${environment.apiURL}/answers/storeAnswers`,
      data,
      { headers: answersService.headers }
    );
  }

  getRightAndBadAnswersQuantity(data: any, answersService: AnswersService) {
    const token = localStorage.getItem('token');
    answersService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return answersService.http.post(
      `${environment.apiURL}/statistics/getRightAndBadAnswersQuantity`,
      data,
      { headers: answersService.headers }
    );
  }

  getDetailsAnswerByVersion(data: any, answersService: AnswersService) {
    const token = localStorage.getItem('token');
    answersService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return answersService.http.post(
      `${environment.apiURL}/statistics/getDetailsAnswerByVersion`,
      data,
      { headers: answersService.headers }
    );
  }

  getDetailsAnswerByState(data: any, answersService: AnswersService) {
    const token = localStorage.getItem('token');
    answersService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return answersService.http.post(
      `${environment.apiURL}/statistics/getDetailsAnswerByState`,
      data,
      { headers: answersService.headers }
    );
  }

  getDetailsAnswerByStratum(data: any, answersService: AnswersService) {
    const token = localStorage.getItem('token');
    answersService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return answersService.http.post(
      `${environment.apiURL}/statistics/getDetailsAnswerByStratum`,
      data,
      { headers: answersService.headers }
    );
  }

  getDetailsAnswerByFacultyFirstOption(
    data: any,
    answersService: AnswersService
  ) {
    const token = localStorage.getItem('token');
    answersService.headers = {
      Authorization: `Bearer ${token}`,
    };

    return answersService.http.post(
      `${environment.apiURL}/statistics/getDetailsAnswerByFacultyFirstOption`,
      data,
      { headers: answersService.headers }
    );
  }
}
