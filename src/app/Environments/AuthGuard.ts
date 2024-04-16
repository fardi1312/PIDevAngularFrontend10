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
    if (state.url.startsWith('/admin/')) {
      if (userRole === 'ROLE_ADMIN') {
        return true; 
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
    } 
    else if (state.url.startsWith('/user/')) {
      if ('ROLE_USER' === 'ROLE_USER') {
        return true; 
      } else {
        this.router.navigate(['/login']); 
        return false;
      }
    }
    return true;
  }
}
