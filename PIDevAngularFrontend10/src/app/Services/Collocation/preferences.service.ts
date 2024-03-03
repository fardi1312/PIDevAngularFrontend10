<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
=======
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd
import { Observable } from 'rxjs';
import { CollocationPreferences } from 'src/app/Model/Collocation/CollocationPreferences';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

<<<<<<< HEAD

  
  private apiUrl = 'http://localhost:8083/api/collocation/preferences'; 
=======
  private apiUrl = 'http://localhost:8083/api/collocationPreferences'; 
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd
  constructor(private httpClient: HttpClient) { }

  getCollocationPreferences(): Observable<CollocationPreferences[]> {
    return this.httpClient.get<CollocationPreferences[]>(`${this.apiUrl}`);
  }

  getCollocationPreferencesById(id: number): Observable<CollocationPreferences> {
    return this.httpClient.get<CollocationPreferences>(`${this.apiUrl}/${id}`);
  }

  createCollocationPreferences(preferences: CollocationPreferences): Observable<CollocationPreferences> {
    return this.httpClient.post<CollocationPreferences>(this.apiUrl, preferences);
  }

  updatePreferences(id: number, preferences: CollocationPreferences): Observable<CollocationPreferences> {
    return this.httpClient.put<CollocationPreferences>(`${this.apiUrl}/${id}`, preferences);
  }

  deleteCollocationPreferences(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
<<<<<<< HEAD

=======
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd
