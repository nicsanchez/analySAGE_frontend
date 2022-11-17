import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  public headers = {};
  constructor(private http: HttpClient) {}

  saveAttachments(data: any, questionsService: QuestionsService) {
    const token = localStorage.getItem('token');
    questionsService.headers = {
      Authorization: `Bearer ${token}`,
    };
    return questionsService.http.post(
      `${environment.apiURL}/questions/storeQuestions`,
      data,
      { headers: questionsService.headers }
    );
  }
}
