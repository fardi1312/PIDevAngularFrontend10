import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CarpoolingOffer } from '../../models/modelSM/CarpoolingOffer';
import { CarpoolingRequest } from '../../models/modelSM/CarpoolingRequest';
import { CarpoolingPreferences } from 'src/app/models/modelSM/CarpoolingPreferenes';

@Injectable({
  providedIn: 'root'
})
export class CarpoolingService {

  private apiUrl = 'http://localhost:8083/sui';

  
  constructor(private http: HttpClient) { }

  getAll(): Observable<CarpoolingOffer[]> {
    return this.http.get<CarpoolingOffer[]>(`${this.apiUrl}/getall`);
  } 
  findMatchingOffers(id: number): Observable<CarpoolingOffer[]> {
    
    return this.http.get<CarpoolingOffer[]>(`${this.apiUrl}/getMatching/${id}`);
  }
  add(userId: number, newOffer: CarpoolingOffer): Observable<CarpoolingOffer> {
    return this.http.post<CarpoolingOffer>(`${this.apiUrl}/addCO/${userId}`, newOffer);
  }
 updateOffer(cooId:number,newOffer:CarpoolingOffer): Observable<CarpoolingOffer>{
  
  return this.http.post<CarpoolingOffer>(`${this.apiUrl}/updateOff/${cooId}`,newOffer)
 }
 updateCarpoolingPreferences (id : number, newpreference : CarpoolingPreferences) :  Observable<CarpoolingPreferences> {
  
  return this.http.post<CarpoolingPreferences>(`${this.apiUrl}/updatepref/${id}`, newpreference);
}


  AddRequest(userId: number,offerId : number , newReq: CarpoolingRequest,nba : number,nbr : number): Observable<CarpoolingRequest> {
    return this.http.post<CarpoolingRequest>(`${this.apiUrl}/addreq/${userId}/${offerId}/${nba}/${nbr}`, newReq);
  }

addPrefernces(userId:number, newPrefernce : CarpoolingPreferences){

  return this.http.post<CarpoolingPreferences>(`${this.apiUrl}/addPref/${userId}`,newPrefernce);
}
updatePoint(userId: number, pcn: number): Observable<void> {
  return this.http.post<void>(`${this.apiUrl}/updatePoint/${userId}/${pcn}`, null);
}


searchCarpoolingOffer(loc: string, type: string, departureDate: Date, returnDate: Date): Observable<CarpoolingOffer[]> {
  // Format the dates as strings in ISO format
  //const formattedDepartureDate = departureDate.toISOString().split('T')[0];
  //const formattedReturnDate = returnDate.toISOString().split('T')[0];
 
  const url = `${this.apiUrl}/search/${loc}/${type}/${departureDate}/${returnDate}`;
  

  return this.http.get<CarpoolingOffer[]>(url);
}



searchCarpooling(location: string, type : string, availablePlaces: number, dateRent: Date): Observable<CarpoolingOffer[]> {
  let params = new HttpParams();
  if (location) {
    params = params.set('location', location);
  }
  if (type) {
    params = params.set('carpoolingType', type);
  }
  if (availablePlaces) {
    params = params.set('availablePlaces', availablePlaces.toString());
  }
/*
  if (dateRent) {
    const formattedDate = this.datePipe.transform(dateRent, 'yyyy-MM-dd');
    if (formattedDate) {
      params = params.set('dateRent', formattedDate);
    }
  }
*/
  return this.http.get<CarpoolingOffer[]>(`${this.apiUrl}/search`, { params: params }).pipe(
    catchError((error: any) => {
      // Handle the error here
      console.error('An error occurred:', error);
      // Re-throw the error to keep it consistent with the return type
      return throwError(error);
    })
  );

}
findCarpoolingOffersByDateAndPrice(date: string, price: number): Observable<CarpoolingOffer[]> {
  //const formattedDate = this.formatDate(date); // Ensure date is formatted correctly
  return this.http.get<CarpoolingOffer[]>(`${this.apiUrl}/search-carpooling-offers/${date}/${price}`);
}

private formatDate(date: Date): string {
  return date.toISOString().split('T')[0]; // Format date as "yyyy-MM-dd"
}


 
  public listView: boolean = false;
  public gridOptions: boolean = true;
  public col_xl_4: boolean = false;
  public col_md_6: boolean = true;
  public col_lg_4: boolean = false;
  public col_6: boolean = false;
  public col_lg_6: boolean = false;
  public col_xl_6: boolean = false;
  public col_xl_12: boolean = false;
  public col_xxl_3: boolean = false;

  gridOpen() {
    this.gridOptions = true;
    this.col_lg_6 = true;
    this.col_md_6 = true;
    this.col_xl_4 = true;
    this.col_lg_4 = false;
    this.col_6 = false;
    this.col_xl_6 = false;
    this.col_xl_12 = false;
    this.col_xxl_3 = false;
    this.listView = false;
  }

  gridOpen2() {
    this.gridOptions = true;
    this.col_lg_6 = false;
    this.col_md_6 = true;
    this.col_xl_4 = false;
    this.col_lg_4 = false;
    this.col_6 = false;
    this.col_xl_6 = false;
    this.col_xl_12 = false;
    this.col_xxl_3 = false;
    this.listView = false;
  }

  listOpen(){
    this.listView = true;
    this.col_xl_12 = true;
    this.col_xl_6 = false;
    this.gridOptions = false;
    this.col_lg_6 = false;
    this.col_md_6 = false;
    this.col_xl_4 = false;
    this.col_lg_4 = false;
    this.col_6 = false;
    this.col_xxl_3 = false;
  }

  list(){
    this.listView = true;
    this.col_xl_6 = true;
    this.col_xl_12 = false;
    this.gridOptions = false;
    this.col_lg_6 = false;
    this.col_md_6 = false;
    this.col_xl_4 = false;
    this.col_lg_4 = false;
    this.col_6 = false;
    this.col_xxl_3 = false;
  }

  grid2() {
    this.col_md_6 = true;
    this.gridOptions = false;
    this.col_lg_6 = false;
    this.col_xl_4 = false;
    this.col_lg_4 = false;
    this.col_6 = false;
    this.col_xl_6 = false;
    this.col_xl_12 = false;
    this.col_xxl_3 = false;
    this.listView = false;
  }

  grid3() {
    this.col_md_6 = true;
    this.col_xl_4 = true;
    this.col_lg_4 = false;
    this.col_6 = false;
    this.col_lg_6 = false;
    this.gridOptions = false;
    this.col_xl_6 = false;
    this.col_xl_12 = false;
    this.col_xxl_3 = false;
    this.listView = false;
  }

  grid4() {
    this.col_xxl_3 = true;
    this.col_md_6 = true;
    this.col_xl_4 = true;
    this.col_6 = false;
    this.col_lg_4 = false;
    this.col_lg_6 = false;
    this.gridOptions = false;
    this.col_xl_6 = false;
    this.col_xl_12 = false;
    this.listView = false;
  }
}