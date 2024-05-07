import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UpdateUserPassword } from 'src/app/Model/User/update-user-password';
import { UserService } from 'src/app/services/User/UserService';

@Component({
  selector: 'app-forgotupd-password',
  templateUrl: './forgotupd-password.component.html',
  styleUrls: ['./forgotupd-password.component.css']
})
export class ForgotUpdPasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  errorMessage: string | undefined;
  email!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.params['email']; 

    this.updatePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  newPasswordMismatch(): boolean {
    return this.updatePasswordForm.get('confirmPassword')?.hasError('passwordMismatch') || false;
  }

  onSubmit(): void {
    if (this.updatePasswordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword } = this.updatePasswordForm.value;

    interface UpdateUserPassword {
      email: string;
      currentPassword: string;
      newPassword: string;
    }

    const updatePasswordData: UpdateUserPassword = {
      email: this.email,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    this.userService.updatePasswordForget(updatePasswordData).subscribe(
      () => {
        this.errorMessage = undefined;
        console.log('Password updated successfully');
        this.updatePasswordForm.reset();
      },
      (error) => {
        console.error('Failed to update password:', error);
        this.errorMessage = 'Failed to update password. Please try again later.';
      }
    );
  }






  
}
