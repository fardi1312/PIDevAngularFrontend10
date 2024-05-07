import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/User/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.jwtToken) {
          const jwtToken = response.jwtToken;
          this.cookieService.set('JWT', jwtToken);
          localStorage.setItem('JWT', jwtToken);
          const userRole = response.role;
          console.log("User role:", userRole); 
          if (userRole === 'ROLE_USER') {
            this.router.navigateByUrl('/user/timeline');
          } else if (userRole === 'ROLE_ADMIN') {
            this.router.navigateByUrl('/admin/dashboard');
          } else {
            console.log("Unknown role: " + userRole);
          }
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
  
}
