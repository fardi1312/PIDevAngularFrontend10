import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';
import { Registration } from 'src/app/Model/Registration/Registration';
import { User } from 'src/app/Model/User/user'; 

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistrationService {
  constructor(private http: HttpClient) { }

  addRegistration(registration: Registration): Observable<Registration> { 
    return this.http.post<Registration>(`${BASE_URL}user/registration/add`, registration);
  } 

  getAllRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${BASE_URL}user/registration/all`);
  }

  getRegistrationById(id: number): Observable<Registration> {
    return this.http.get<Registration>(`${BASE_URL}user/registration/${id}`);
  }
  getRegistrationsByUserId(userId: number): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${BASE_URL}user/registration/getuserid/${userId}`);
  }
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${BASE_URL}user/${userId}`);
  }
  updateRegistration(id: number, registration: Registration): Observable<Registration> {
    return this.http.put<Registration>(`${BASE_URL}user/registration/update/${id}`, registration);
  }

  deleteRegistration(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}user/registration/delete/${id}`);
  }





}
