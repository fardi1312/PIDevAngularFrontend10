import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Club } from 'src/app/models/Collocation/Club';
import { MemberShipApplication } from 'src/app/models/Collocation/MemberShipApplication';
import { CalendarEvent } from 'angular-calendar';
import { ClubMembership } from 'src/app/models/Collocation/ClubMemberShip';
@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'http://localhost:8083/api/clubs';

  constructor(private httpClient: HttpClient) { }

  createClub(club: Club, id: number): Observable<Club> {
    console.log("nkaderk hahah",club);

    return this.httpClient.post<Club>(`${this.apiUrl}/${id}`, club);
  }
  getAllMembershipApplications(): Observable<MemberShipApplication[]> {
    return this.httpClient.get<MemberShipApplication[]>(`${this.apiUrl}/MembershipApplications`);
  }

  getGlobalData(): Observable<number> {
    return this.httpClient.get<number>(`${this.apiUrl}/getGlobalData`);
  } 

  updateImage(id: number, image: File): Observable<Club> {
    const formData: FormData = new FormData();  
    console.log("fel Service")
   
    formData.append('image', image, image.name);
  
    return this.httpClient.post<Club>(`${this.apiUrl}/uploadImage/${id}`, formData);
  
}


  getImageUrl(id: number): Observable<string> {
    return this.httpClient.get(`${this.apiUrl}/getImage/${id}`, { responseType: 'text' });
  }
  
  

  getAllMemberships(): Observable<ClubMembership[]> {
    return this.httpClient.get<ClubMembership[]>(`${this.apiUrl}/Memberships`);
  }


  getAllClubs(): Observable<Club[]> {
    return this.httpClient.get<Club[]>(this.apiUrl);
  }  


  addMembershipApplication(clubId: number, userId: number, message: string|null): Observable<Club> {
    const url = `${this.apiUrl}/addMember/${clubId}/${userId}`;
    return this.httpClient.post<Club>(url, message ); // Include message in the request body
  }  




  updateMemberShipApplication(id: number, newApplicationData: MemberShipApplication): Observable<MemberShipApplication> {
    return this.httpClient.put<MemberShipApplication>(`${this.apiUrl}/MemberShipApplication/${id}`, newApplicationData); } 



    assignInterviewer(id: number, newApplicationData: MemberShipApplication): Observable<MemberShipApplication> {
      return this.httpClient.post<MemberShipApplication>(`${this.apiUrl}/assignInterviewer/${id}`, newApplicationData); }
  
      updateClubLogo(club: Club, logo: File | null) {
        const formData = new FormData();
        if (logo) {
          formData.append('logo', logo);
        }
      
        return this.httpClient.post<Club>(this.apiUrl, formData);
      }
   getClubById(id: number): Observable<Club> {
    return this.httpClient.get<Club>(`${this.apiUrl}/${id}`);
  } 
  acceptMembership(calendarEvent: CalendarEvent): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/accept`, calendarEvent);
  } 
  

  refuseMembership(calendarEvent: CalendarEvent): Observable<Club> {  
    console.log("hana fel Service ") ; 
    return this.httpClient.post<any>(`${this.apiUrl}/refuse`, calendarEvent);
  }

  addMemberToClub(clubId: number, userId: number): Observable<Club> {
    const url = `${this.apiUrl}/${clubId}/members/${userId}`;
    return this.httpClient.post<Club>(url, null);
  }


  updateClub(id: number, newClubData: Club): Observable<Club> {
    return this.httpClient.put<Club>(`${this.apiUrl}/${id}`, newClubData);
  } 

  verifyEmail(email: string): Observable<any> {
    const encodedEmail = encodeURIComponent(email); 
    return this.httpClient.get<any>(`${this.apiUrl}/verify-email/${encodedEmail}`);
  }
  

  deleteClub(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }  



} 
