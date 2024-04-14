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
import {PostResponse} from "../../Model/User/post-response";

const BASE_URL = environment.apiUrlUser;
const BASE_URL1 = environment.apiUrlR;

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




  getIdAuthenticatedUser(): Observable<number> {
    return this.http.get<number>('http://localhost:8083/user/account/iduser');
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




  getUserById(userId: number): Observable<UserResponse | HttpErrorResponse> {
    return this.http.get<UserResponse | HttpErrorResponse>(`${BASE_URL}account/users/${userId}`);
  }
  
  getUserById1(id: number): Observable<User> {
    const url = `${BASE_URL1}`;
    return this.http.get<User>(url);
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





////////////////////////////////////////////////////
///////


  getUserPosts(userId: number, page: number, size: number): Observable<PostResponse[] | HttpErrorResponse> {
    const reqParams = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PostResponse[] | HttpErrorResponse>(`${BASE_URL}account/users/posts`, { params: reqParams });
  }



/////



  ///////////////////////////////
  ///////////////////////////////
  getUserFollowingList(userId: number, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.http.get<UserResponse[] | HttpErrorResponse>(`${BASE_URL}account/users/${userId}/following`, { params: reqParams });
	}

	getUserFollowerList(userId: number, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.http.get<UserResponse[] | HttpErrorResponse>(`${BASE_URL}account/users/${userId}/follower`, { params: reqParams });
	}

	getUserPosts1(userId: number, page: number, size: number): Observable<PostResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.http.get<PostResponse[] | HttpErrorResponse>(`${BASE_URL}account/users/${userId}/posts`, { params: reqParams });
	}

	followUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.http.post<any | HttpErrorResponse>(`${BASE_URL}account/follow/${userId}`, null);
	}

	unfollowUser(userId: number): Observable<any | HttpErrorResponse> {
		return this.http.post<any | HttpErrorResponse>(`${BASE_URL}account/unfollow/${userId}`, null);
	}

	getUserSearchResult(key: string, page: number, size: number): Observable<UserResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('key', key).set('page', page).set('size', size);
		return this.http.get<UserResponse[] | HttpErrorResponse>(`${BASE_URL}account/users/search`, { params: reqParams });
	}


  getProfilePhotoUrl1(userId: number): Observable<string> {
    return this.http.get<string>(`${BASE_URL}account/users/${userId}/profilephoto`, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error fetching user photo URL:', error);
        return throwError(error);
      })
    );
  }
  getCoverPhotoUrl1(userId: number): Observable<string> {
    return this.http.get<string>(`${BASE_URL}account/users/${userId}/coverphoto`, { responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error fetching user cover photo URL:', error);
        return throwError(error);
      })
    );
  }


}
