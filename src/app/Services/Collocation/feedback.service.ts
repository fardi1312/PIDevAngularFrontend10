import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollocationFedback } from 'src/app/models/Collocation/CollocationFeedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService { 
  private apiUrl = "http://localhost:8083/api/collocation-feedback"; 
  constructor(private httpClient:HttpClient) { } 
  getCollocationFeedbacks():Observable<CollocationFedback[]>{ 
    return this.httpClient.get<CollocationFedback[]>(`${this.apiUrl}`);  
  } 
  getCollocationFeedbackById(id:number):Observable<CollocationFedback> { 
    return this.httpClient.get<CollocationFedback>(`${this.apiUrl}/${id}`) 
  } 
    uploadImage(id: number, image: File): Observable<Object> {
    const formData = new FormData();
    formData.append('image', image, image.name);
  
    return this.httpClient.post(`${this.apiUrl}/${id}/image`, formData);
  }
  

  createCollocationFeedback(collocationFeedback: CollocationFedback, idOffer:number): Observable<CollocationFedback> {
    return this.httpClient.post<CollocationFedback>(`${this.apiUrl}/${idOffer}`, collocationFeedback);
  }

  updateFeedback(id: number, feedback: CollocationFedback): Observable<CollocationFedback> {
    return this.httpClient.put<CollocationFedback>(`${this.apiUrl}/${id}`, feedback);
  }

  deleteFeedback(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
