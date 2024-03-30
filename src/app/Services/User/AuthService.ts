
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { UserLogin } from 'src/app/Model/User/user-login';
import { environment } from 'src/app/Environments/environment';
import { UserSignup } from 'src/app/Model/User/user-signup';
import { User } from 'src/app/Model/User/user';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  updateProfilePhoto(file: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, public cookieService: CookieService) { }

  login(userLogin: UserLogin): Observable<any> {
    return this.http.post(BASE_URL + 'authenticate', userLogin)
      .pipe(
        catchError(this.handleError),
        tap((response: any) => {
          if (response.jwtToken) {
            this.cookieService.set('JWT', response.jwtToken);
            console.log("My token is: " + this.cookieService.get('JWT'));
            this.cookieService.set('userRole', response.role);
            console.log("My role is: " + response.role);
          }
        })
      );
  }
  

  signup(userSignup: UserSignup): Observable<any> {
    return this.http.post(BASE_URL + 'signup', userSignup)
      .pipe(
        catchError(this.handleError)
      );
  }

  github(): Observable<any> {
    return this.http.get(BASE_URL + 'oauth2/authorization/github');
  }
  







  logout(): void {
    this.cookieService.delete('JWT');
  }






  forgotPassword(email: string): Observable<any> {
    const url = `${BASE_URL}forgot-password?email=${email}`;
    return this.http.get(url).pipe(
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
