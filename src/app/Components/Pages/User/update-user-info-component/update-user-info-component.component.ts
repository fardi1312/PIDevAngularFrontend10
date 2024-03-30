import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/User/UserService';
import { UpdateUserInfo } from 'src/app/Model/User/update-user-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-info-component',
  templateUrl: './update-user-info-component.component.html',
  styleUrls: ['./update-user-info-component.component.css']
})
export class UpdateUserInfoComponentComponent {
[x: string]: any;
  updateUserInfoForm: FormGroup;
  updateUserInfo: UpdateUserInfo | undefined;

  constructor(private userService: UserService, private formBuilder: FormBuilder) 
  {
    this.updateUserInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      intro: ['', Validators.required],
      hometown: ['', Validators.required],
      currentCity: ['', Validators.required],
      eduInstitution: ['', Validators.required],
      workplace: ['', Validators.required],
      birthDate: ['', Validators.required], 
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.updateUserInfoForm.valid) {
      const birthDate = new Date(this.updateUserInfoForm.value.birthDate).toISOString().split('T')[0] + ' 00:00:00';
      this.updateUserInfoForm.patchValue({ birthDate }); // Update birthDate in the form
      this.updateUserInfo = this.updateUserInfoForm.value;
      if (this.updateUserInfo) {
        this.userService.updateUserInfo(this.updateUserInfo).subscribe(
          () => {
            console.log('User info updated successfully');
            this.updateUserInfoForm.reset();
          },
          (error) => {
            console.error('Error updating user info:', error);
          }
        );
      }
    }
  }
}
