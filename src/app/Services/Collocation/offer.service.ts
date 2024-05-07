import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  static readonly userId: number = 1;


  private apiUrl = 'http://localhost:8083/api/collocation'; 
  constructor(private httpClient: HttpClient,private datePipe: DatePipe) { }
  getCollocationOffers(): Observable<CollocationOffer[]> {
    return this.httpClient.get<CollocationOffer[]>(`${this.apiUrl}`);
  }

  getCollocationOfferById(id: number): Observable<CollocationOffer> {
    return this.httpClient.get<CollocationOffer>(`${this.apiUrl}/${id}`);
  }

  


  deleteCollocationOffer(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
  createCollocation(collocationOffer: CollocationOffer, userId: number): Observable<CollocationOffer> {
    return this.httpClient.post<CollocationOffer>(`${this.apiUrl}/offers/create`, collocationOffer);
  }

  updateOffer(id: number, updatedCollocationOffer: CollocationOffer): Observable<CollocationOffer> {
    return this.httpClient.put<CollocationOffer>(`${this.apiUrl}/${id}`, updatedCollocationOffer);
  }


  getCollocationOffersByUserId(userId: number): Observable<CollocationOffer[]> {
    return this.httpClient.get<CollocationOffer[]>(`${this.apiUrl}/user/${userId}`);
  }
  

  toggleOfferSavedStatus(offerId: number): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/toggle-saved-status/${offerId}`, {});
  }
  searchOffers(governorate: string, houseType: number, availablePlaces: number, dateRent: Date): Observable<CollocationOffer[]> {
    let params = new HttpParams();
    if (governorate) {
      params = params.set('governorate', governorate);
    }
    if (houseType) {
      params = params.set('houseType', houseType.toString());
    }
    if (availablePlaces) {
      params = params.set('availablePlaces', availablePlaces.toString());
    }
    if (dateRent) {
      const formattedDate = this.datePipe.transform(dateRent, 'yyyy-MM-dd');
      if (formattedDate) {
        params = params.set('dateRent', formattedDate);
      }
    }

    return this.httpClient.get<CollocationOffer[]>(`${this.apiUrl}/search`, { params: params }).pipe(
      catchError((error: any) => {
        // Handle the error here
        console.error('An error occurred:', error);
        // Re-throw the error to keep it consistent with the return type
        return throwError(error);
      })
    );
  }




  getMatchingOffersForUser(userId: number): Observable<CollocationOffer[]> {
    const url = `${this.apiUrl}/matchuser/${userId}`; // Use correct endpoint name
    return this.httpClient.get<CollocationOffer[]>(url);
  }
  acceptCollocationRequest(offerId: number, requestId: number): Observable<string> {
    return this.httpClient.put<string>(`${this.apiUrl}/${offerId}/${requestId}`, {})
  };
  sendMail(offerId: number, requestId: number): Observable<string> {
    const url = `${this.apiUrl}/send-mail/${offerId}/${requestId}`;
    return this.httpClient.post<string>(url, null);
  };
  refuseCollocationRequest(offerId: number, requestId: number): Observable<string> {
    const url = `${this.apiUrl}/refuse/${offerId}/${requestId}`;
    return this.httpClient.put<string>(url, {});
  };



  
  
  
  updateImage(id: number, image: File): Observable<CollocationOffer> {
    const formData: FormData = new FormData();  
   
    formData.append('image', image, image.name);
  
    return this.httpClient.post<CollocationOffer>(`${this.apiUrl}/uploadImage/${id}`, formData);
  
}



getImageUrl(id: number): Observable<string> {
  return this.httpClient.get(`${this.apiUrl}/getImage/${id}`, { responseType: 'text' });
}





}

  


