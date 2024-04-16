import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/User/AuthService';

@Component({
  selector: 'app-head-back',
  templateUrl: './head-back.component.html',
  styleUrls: ['./head-back.component.css']
})
export class HeadBackComponent {

  constructor(
    private authService: AuthService,
    private router: Router,

  ) { }


  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
