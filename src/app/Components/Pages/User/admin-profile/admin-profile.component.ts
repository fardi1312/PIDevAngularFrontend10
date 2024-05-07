import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserInfo } from 'src/app/Model/User/update-user-info';
import { UserSignup } from 'src/app/Model/User/user-signup';
import { AdminService } from 'src/app/services/User/AdminService';
import { UserService } from 'src/app/services/User/UserService';
import { MatDialog } from '@angular/material/dialog';
import { PhotoUploadDialogComponent } from '../photo-upload-dialog/photo-upload-dialog.component';
import { ViewPhotoDialogComponent } from '../view-photo-dialog/view-photo-dialog.component';
import { User } from 'src/app/Model/User/user';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  signupForm!: FormGroup;
  userSignup: UserSignup = new UserSignup();
  updateUserInfoForm!: FormGroup;
  updateUserInfo!: UpdateUserInfo;
  imageUrl: string | undefined;
  authenticationError = false;
  authUser: any;
  isProfileViewerOwner!: boolean;
  user!: User;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });

    this.updateUserInfoForm = this.fb.group({
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

    this.userService.getAuthenticatedUser().subscribe(
      (user: User) => {
        this.user = user;
        this.loadProfilePhotoUrl();
      },
      (error) => {
        console.error('Error fetching authenticated user:', error);
        this.authenticationError = true;
      }
    );
  }

  signup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.userSignup = this.signupForm.value;
    this.service.signup(this.userSignup).subscribe(
      (response) => {
        console.log('User signed up successfully:', response);
      },
      (error) => {
        console.error('Error occurred during signup:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.updateUserInfoForm.valid) {
      const birthDate = new Date(this.updateUserInfoForm.value.birthDate).toISOString().split('T')[0] + ' 00:00:00';
      this.updateUserInfoForm.patchValue({ birthDate });
      this.updateUserInfo = this.updateUserInfoForm.value;
      this.service.updateUserInfo(this.updateUserInfo).subscribe(
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

  loadProfilePhotoUrl(): void {
    this.userService.getProfilePhotoUrl().subscribe(
      (imageUrl: string) => {
        this.imageUrl = imageUrl;
        this.isProfileViewerOwner = true;

      },
      (error) => {
        console.error('Error fetching profile photo URL:', error);
        this.authenticationError = true;
      }
    );
  }

  openPhotoUploadDialog(e: Event, uploadType: string): void {
    e.stopPropagation();
    let header: string = 'Upload Photo';
    if (uploadType === 'profilePhoto') {
      header = 'Upload Profile Photo';
    } else if (uploadType === 'coverPhoto') {
      header = 'Upload Cover Photo';
    }

    const dialogRef = this.matDialog.open(PhotoUploadDialogComponent, {
      data: { authUser: this.authUser, uploadType, header },
      autoFocus: false,
      minWidth: '300px',
      maxWidth: '900px',
      maxHeight: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.updatedUser) {
        if (uploadType === 'profilePhoto') {
          // Handle profile photo update
        } else if (uploadType === 'coverPhoto') {
          // Handle cover photo update
        }
      }
    });
  }

  openViewPhotoDialog(photoUrl: string): void {
    this.matDialog.open(ViewPhotoDialogComponent, {
      data: photoUrl, 
      autoFocus: false,
      maxWidth: '1200px'
    });
  }










}
