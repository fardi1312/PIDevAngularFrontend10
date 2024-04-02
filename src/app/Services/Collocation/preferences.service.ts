import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollocationPreferences } from 'src/app/models/Collocation/CollocationPreferences';

@Injectable({
  providedIn: 'root'
})
export class CollocationPreferencesService {
  static readonly userId: number = 1;

  private apiUrl = 'http://localhost:8083/api/collocationPreferences';

  constructor(private http: HttpClient) { }

  savePreferences(preferences: CollocationPreferences, userId: number): Observable<CollocationPreferences> {
    return this.http.post<CollocationPreferences>(`${this.apiUrl}?userId=${userId}`, preferences);
  }

  getPreferencesById(id: number): Observable<CollocationPreferences> {
    return this.http.get<CollocationPreferences>(`${this.apiUrl}/${id}`);
  }

  getAllPreferences(): Observable<CollocationPreferences[]> {
    return this.http.get<CollocationPreferences[]>(this.apiUrl);
  }
  getPreferencesByUserId(userId: number): Observable<CollocationPreferences[]> {
    return this.http.get<CollocationPreferences[]>(`${this.apiUrl}/user/${userId}`);
  }



  updatePreferences(id: number, preferences: CollocationPreferences): Observable<CollocationPreferences> {
    return this.http.put<CollocationPreferences>(`${this.apiUrl}/${id}`, preferences);
  }

  deletePreferences(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}