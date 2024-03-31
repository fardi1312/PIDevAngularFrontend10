import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserPassword } from 'src/app/Model/User/update-user-password';
import { UserService } from 'src/app/Services/User/UserService';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
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

    const updatePasswordData: UpdateUserPassword = {
      currentPassword: this.updatePasswordForm.value.currentPassword,
      newPassword: this.updatePasswordForm.value.newPassword,
    };

    this.userService.updatePassword(updatePasswordData).subscribe(
      () => {
        console.log('Password updated successfully');
      },
      (error) => {
        console.error('Failed to update password:', error);
        this.errorMessage = 'Failed to update password. Please try again later.';
      }
    );
  }
}
