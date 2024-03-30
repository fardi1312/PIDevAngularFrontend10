import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/User/AuthService';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  resetPasswordMessage: string = '';

  constructor(private authService: AuthService) {}

  isValidEmail(): boolean {
    // Utilisez une expression régulière pour vérifier si l'email est valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  resetPassword() {
    if (!this.isValidEmail()) {
      this.resetPasswordMessage = "Please enter a valid email address";
      return;
    }

    this.authService.forgotPassword(this.email).pipe(
      catchError(error => {
        console.error(error);
        return of(null);
      })
    ).subscribe(
      response => {
        if (response) {
          this.resetPasswordMessage = response;
        } else {
          this.resetPasswordMessage = 'Password reset successful';
        }
      }
    );
  }
}
