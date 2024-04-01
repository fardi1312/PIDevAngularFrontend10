import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private apiUrl = 'http://localhost:8083/api/collocation'; // Adjust the API URL
  constructor(private httpClient: HttpClient) { }
  getCollocationOffers(): Observable<CollocationOffer[]> {
    return this.httpClient.get<CollocationOffer[]>(`${this.apiUrl}`);
  }

  getCollocationOfferById(id: number): Observable<CollocationOffer> {
    return this.httpClient.get<CollocationOffer>(`${this.apiUrl}/${id}`);
  }
  getCollocationOffersByUserId(userId: number): Observable<CollocationOffer[]> {
    return this.httpClient.get<CollocationOffer[]>(`${this.apiUrl}/user/${userId}`);
  }
  
  refuseCollocationRequest(offerId: number, requestId: number): Observable<string> {
    const url = `${this.apiUrl}/refuse/${offerId}/${requestId}`;
    return this.httpClient.put<string>(url, {});
  }


  createCollocation(collocationOffer: CollocationOffer,userId:number): Observable<CollocationOffer> {
    return this.httpClient.post<CollocationOffer>(`${this.apiUrl}/${userId}`, collocationOffer);
  }
  sendMail(offerId: number, requestId: number): Observable<string> {
    const url = `${this.apiUrl}/send-mail/${offerId}/${requestId}`;
    return this.httpClient.post<string>(url, null);
  }

  updateOffer(id: number, offer: CollocationOffer): Observable<CollocationOffer> {
    return this.httpClient.put<CollocationOffer>(`${this.apiUrl}/${id}`, offer);
  }

  deleteCollocationOffer(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  } 
  acceptCollocationRequest(offerId: number, requestId: number): Observable<string> {
    return this.httpClient.put<string>(`${this.apiUrl}/${offerId}/${requestId}`, {})
  };


}
