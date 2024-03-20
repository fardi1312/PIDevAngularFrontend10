// src/app/services/schedule.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Schedule } from '../../Model/Collocation/Schedule';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private apiUrl = 'http://8083/api/schedule'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getAllSchedulers(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  getSchedulerById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.apiUrl}/${id}`);
  }

  createScheduler(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, schedule);
  }

  updateScheduler(id: number, updatedScheduler: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, updatedScheduler);
  }

  deleteScheduler(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
