import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://localhost:8083/api/calendar-events';

  constructor(private http: HttpClient) {}

  getAllEventsByUser(userId:number): Observable<CalendarEvent[]> { 
    return this.http.get<CalendarEvent[]>(`${this.apiUrl}/user/${userId}`);  
    
  } 


  getEventByIdAndUser(id: number, userId: number): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>(`${this.apiUrl}/${id}/user/${userId}`);
  }

  createEventForUser(userId: number, event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.apiUrl}/user/${userId}`, event);
  }

  updateEventForUser(userId: number, updatedEvent: CalendarEvent): Observable<CalendarEvent> {
    return this.http.put<CalendarEvent>(`${this.apiUrl}/user/${userId}`, updatedEvent);
  }

  deleteEventForUser(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/user/${userId}`);
  } 


}
