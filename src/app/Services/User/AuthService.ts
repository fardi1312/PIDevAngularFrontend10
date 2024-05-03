
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { UserLogin } from 'src/app/Model/User/user-login';
import { environment } from 'src/app/Environments/environment';
import { UserSignup } from 'src/app/Model/User/user-signup';
import { Router } from '@angular/router';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  updateProfilePhoto(file: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient, public cookieService: CookieService, public router: Router) { }

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
    // Array of cookies to delete
    try {
      this.cookieService.deleteAll('JWT');
      this.cookieService.deleteAll('userRole')
      this.cookieService.set('JWT', '');
      this.cookieService.set('userRole', '');
      if(!this.cookieService.get('JWT') && !this.cookieService.get('userRole') )
          {   
          this.router.navigate(['/login']);
            console.log('Logout successful: Cookies deleted');
          } 
      else {console.log('Error deleting cookies');}
    } 
    catch (error) {
      console.error('Error deleting cookies during logout:', error); // Handle errors
    }

 

  }
  




  

  forgotPassword(email: string): Observable<any> {
    const url = `${BASE_URL}forgot-password?email=${email}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getAuthUserId(): Observable<number> {
    return this.http.get<number>('http://localhost:8083/user/account/iduser');
  }


  isUserLoggedIn(): boolean {
    return this.cookieService.check('JWT');
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
