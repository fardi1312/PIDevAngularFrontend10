import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/Model/User/user';
import { UpdateUserInfo } from 'src/app/Model/User/update-user-info';
import { UpdateUserPassword } from 'src/app/Model/User/update-user-password';
import { environment } from 'src/app/Environments/environment';
import { UserResponse } from 'src/app/Model/User/user-response';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL = environment.apiUrlUser;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }



  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>(BASE_URL + 'account').pipe(
      catchError(error => {
        console.error('Error fetching authenticated user:', error);
        return throwError(error);
      })
    );
  }

  updateUserInfo(updateUserInfo: UpdateUserInfo): Observable<any> {
    return this.http.post<any>(BASE_URL + 'account/update/info', updateUserInfo).pipe(
      catchError(error => {
        console.error('Error updating user info:', error);
        return throwError(error);
      })
    );
  }

  deleteUser(): Observable<any> {
    return this.http.delete<any>(BASE_URL + 'account/delete').pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(error);
      })
    );
  }

  updateProfilePhoto(profilePhoto: File): Observable<User> {
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);
    return this.http.post<User>(`${BASE_URL}account/update/profilephoto`, formData, {
      responseType: 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  
  updateCoverPhoto(coverPhoto: File): Observable<User> {
    const formData = new FormData();
    formData.append('coverPhoto', coverPhoto);
    return this.http.post<User>(`${BASE_URL}account/update/coverphoto`, formData, {
      responseType: 'json'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
  



  updatePassword(updateUserPassword: UpdateUserPassword): Observable<any> {
    return this.http.put<any>(BASE_URL + 'account/update/password', updateUserPassword).pipe(
      catchError(error => {
        console.error('Error updating password:', error);
        return throwError(error);
      })
    );
  }



  getUserSearchResult(key: string, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
    const reqParams = new HttpParams().set('key', key).set('page', page).set('size', size);
    return this.http.get<UserResponse[] | HttpErrorResponse>(`${BASE_URL}/users/search`, { params: reqParams });
  }

  getUserById(userId: number): Observable<UserResponse | HttpErrorResponse> {
    return this.http.get<UserResponse | HttpErrorResponse>(`${BASE_URL}users/${userId}`);
  }




  getProfilePhotoUrl(): Observable<string> {
    return this.http.get<string>(BASE_URL + 'account/profilephoto', { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error fetching profile photo URL:', error);
        return throwError(error);
      })
    );
  }

  getCoverPhotoUrl(): Observable<string> {
    return this.http.get<string>(BASE_URL + 'account/coverphoto', { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error fetching cover photo URL:', error);
        return throwError(error);
      })
    );
  }









}
