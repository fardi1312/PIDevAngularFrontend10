import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {} 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.cookieService.get('userRole');
    const jwtToken = this.cookieService.get('JWT'); 
    
    if (state.url.startsWith('/login') || state.url.startsWith('/signup')) {
      if (this.cookieService.get('JWT') === '') {
        return true; 
      } else {
        if(this.cookieService.get('userRole') === 'ROLE_USER')
            {   
            this.router.navigate(['/user/timeline']); 
            return false;
            }
        else if(this.cookieService.get('userRole') === 'ROLE_ADMIN')
            {   
            this.router.navigate(['/user/timeline']); 
            return false;
            }
        else 
          {
          this.router.navigate(['/login']); 
          return true;
          }
      }
    } 
    else
    if (state.url.startsWith('/admin/')) {
      if (userRole === 'ROLE_ADMIN') {
        return true; 
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
    } 
    else if (state.url.startsWith('/user/')) {
      if (userRole === 'ROLE_USER') {
        return true; 
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
    }
    return true;
  }
}
