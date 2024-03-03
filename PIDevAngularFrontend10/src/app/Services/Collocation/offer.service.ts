import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollocationOffer } from 'src/app/Model/Collocation/CollocationOffer';


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

  

  createCollocation(collocationOffer: CollocationOffer): Observable<CollocationOffer> {
    return this.httpClient.post<CollocationOffer>(this.apiUrl, collocationOffer);
  }

  updateOffer(id: number, offer: CollocationOffer): Observable<CollocationOffer> {
    return this.httpClient.put<CollocationOffer>(`${this.apiUrl}/${id}`, offer);
  }

  deleteCollocationOffer(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
