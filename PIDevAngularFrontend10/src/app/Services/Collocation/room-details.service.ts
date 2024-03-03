import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomDetails } from 'src/app/Model/Collocation/RoomDetails';

@Injectable({
  providedIn: 'root'
})
export class RoomDetailssService {

  private apiUrl = 'http://localhost:8083/api/room-details'; // Adjust the API URL

  constructor(private http: HttpClient) { }

  getAllRoomDetailss(): Observable<RoomDetails[]> {
    return this.http.get<RoomDetails[]>(this.apiUrl);
  }

  getRoomDetailssById(id: number): Observable<RoomDetails> {
    return this.http.get<RoomDetails>(`${this.apiUrl}/${id}`);
  }



  updateRoomDetailss(id: number, updatedRoomDetailss: RoomDetails): Observable<RoomDetails> {
    return this.http.put<RoomDetails>(`${this.apiUrl}/${id}`, updatedRoomDetailss);
  }

  deleteRoomDetailss(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}  