import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(toAddress: string, subject: string, body: string): Observable<any> {
    // Définir les données JSON à envoyer
    const emailData = {
      toAddress: toAddress,
      subject: subject,
      body: body
    };

    // Définir les en-têtes de la requête
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Envoyer la demande HTTP POST avec les données JSON
    return this.http.post<any>('http://localhost:8083/send-email', emailData, { headers: headers });
  }
}
