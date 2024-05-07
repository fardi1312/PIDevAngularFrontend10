import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/modelOns/Question';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  
  private baseUrl = 'http://localhost:8083/quiz1';

  constructor(private http: HttpClient) { }
  addQuestions(questions: Question[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/questions`, questions);
  }
  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/allQuestions`);
  }
  deleteQuestion(questionId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteQuestion?questionId=${questionId}`);
  }

 
  startQuiz(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/start/${userId}`);
  }
  


}
