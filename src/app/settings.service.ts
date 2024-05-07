import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settings } from './Model/settings/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = 'http://localhost:8083/api/settings'; // API URL

  constructor(private http: HttpClient) { }

  getAllSettings(): Observable<Settings[]> {
    return this.http.get<Settings[]>(this.apiUrl);
  }

  addSetting(newSetting: Settings): Observable<Settings> {
    return this.http.post<Settings>(this.apiUrl + '/add', newSetting);
  }

  deleteSetting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
