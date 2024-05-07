import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Promotion } from 'src/app/models/modelOns/Promotion';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = 'http://localhost:8083/api/promotions'; 

  constructor(private http: HttpClient) {}

  addPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(`${this.apiUrl}`, promotion);
  }

  getPromotionById(id: number): Observable<Promotion> {
    return this.http.get<Promotion>(`${this.apiUrl}/${id}`);
  }

  updatePromotion(id: number, promotion: Promotion): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.apiUrl}/${id}`, promotion);
  }

  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateExpiredPromoCodes(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/update-expired`, {});
  }

  calculateDiscount(code: string, total: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/discount?code=${code}&total=${total}`);
  }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.apiUrl}`);
  }
  
  
  getAllPromotionsValable(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.apiUrl}/PromotionValalble`);
  }
  applyDiscount(code: string, idC: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/apply/${code}/${idC}`, null);
  }




}
