import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollocationRequest } from 'src/app/models/Collocation/CollocationRequest';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:8083/api/collocationRequest';

  constructor(private httpClient: HttpClient) { }

  getCollocationRequests(): Observable<CollocationRequest[]> {
    return this.httpClient.get<CollocationRequest[]>(this.apiUrl);
  }

  getCollocationRequestById(id: number): Observable<CollocationRequest> {
    return this.httpClient.get<CollocationRequest>(`${this.apiUrl}/${id}`);
  }

  createCollocationRequest(idOffer: number, userId: number, request: CollocationRequest): Observable<CollocationRequest> {
    return this.httpClient.post<CollocationRequest>(`${this.apiUrl}/${idOffer}/${userId}`, request);
  }
  getRequestsForOffer(offerId: number): Observable<CollocationRequest[]> {
    return this.httpClient.get<CollocationRequest[]>(`${this.apiUrl}/${offerId}/requests`);
  }
  
  updateRequest(id: number, request: CollocationRequest): Observable<CollocationRequest> {
    return this.httpClient.put<CollocationRequest>(`${this.apiUrl}/${id}`, request);
  }

  deleteCollocationRequest(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  } 
}
