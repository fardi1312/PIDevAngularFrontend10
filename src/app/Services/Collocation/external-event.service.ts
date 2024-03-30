import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExternalEvent } from '../../Model/Collocation/ExternalEvent';

@Injectable({
  providedIn: 'root'
})
export class ExternalEventService {
  private baseUrl = 'http://localhost:8083/api/external-events'; // Update with your API endpoint

  constructor(private httpClient: HttpClient) { }

  getAllExternalEvents(): Observable<ExternalEvent[]> {
    return this.httpClient.get<ExternalEvent[]>(this.baseUrl);
  }

  getExternalEventById(id: number): Observable<ExternalEvent> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ExternalEvent>(url);
  }

  createExternalEvent(externalEvent: ExternalEvent): Observable<ExternalEvent> {
    return this.httpClient.post<ExternalEvent>(this.baseUrl, externalEvent);
  }

  updateExternalEvent(id: number, updatedEvent: ExternalEvent): Observable<ExternalEvent> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.put<ExternalEvent>(url, updatedEvent);
  }

  deleteExternalEvent(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
