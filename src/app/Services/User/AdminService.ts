// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/Model/User/user';
import { environment } from 'src/app/Environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UpdateUserInfo } from 'src/app/Model/User/update-user-info';
import { UserSignup } from 'src/app/Model/User/user-signup';

const BASE_URL = environment.apiUrlAdmin;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('JWT')
    });
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${BASE_URL}/users`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching all users:', error);
        return throwError(error);
      })
    );
  }

  deleteUser(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${BASE_URL}/user/${email}/delete`, { headers }).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(error);
      })
    );
  }

  disableUserAccount(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${BASE_URL}/user/${email}/disable`, null, { headers }).pipe(
      catchError(error => {
        console.error('Error disabling user account:', error);
        return throwError(error);
      })
    );
  }

  enableUserAccount(email: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${BASE_URL}/user/${email}/enable`, null, { headers }).pipe(
      catchError(error => {
        console.error('Error enabling user account:', error);
        return throwError(error);
      })
    );
  }

  getTotalUserCount(): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${BASE_URL}/user/count`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching total user count:', error);
        return throwError(error);
      })
    );



    
  }

  getUserByEmail(email: string): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${BASE_URL}/user/${email}`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching user by email:', error);
        return throwError(error);
      })
    );
  }
  





  updateUserInfo(updateUserInfo: UpdateUserInfo): Observable<any> {
    return this.http.post<any>(BASE_URL + '/update/info', updateUserInfo).pipe(
      catchError(error => {
        console.error('Error updating user info:', error);
        return throwError(error);
      })
    );
  }


  signup(userSignup: UserSignup): Observable<any> {
    return this.http.post(BASE_URL + '/signup', userSignup)
      .pipe(
        catchError(this.handleError)
      );
  }




  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }





}
