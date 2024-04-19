import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from 'src/app/Model/Collocation/Club';
@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'http://localhost:8083/api/clubs';

  constructor(private httpClient: HttpClient) { }

  createClub(club: Club, id: number): Observable<Club> {
    return this.httpClient.post<Club>(`${this.apiUrl}/${id}`, club);
  }

  getAllClubs(): Observable<Club[]> {
    return this.httpClient.get<Club[]>(this.apiUrl);
  }

  getClubById(id: number): Observable<Club> {
    return this.httpClient.get<Club>(`${this.apiUrl}/${id}`);
  }

  updateClub(id: number, newClubData: Club): Observable<Club> {
    return this.httpClient.put<Club>(`${this.apiUrl}/${id}`, newClubData);
  }

  deleteClub(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
