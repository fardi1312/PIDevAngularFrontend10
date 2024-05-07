import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/app/Environments/environment';
import { AuthService } from 'src/app/services/User/AuthService';
import { UserService } from 'src/app/services/User/UserService';

@Component({
  selector: 'app-photo-upload-dialog',
  templateUrl: './photo-upload-dialog.component.html',
  styleUrls: ['./photo-upload-dialog.component.css']
})
export class PhotoUploadDialogComponent implements OnInit {

  photoPreviewUrl: string | undefined;
  photo: File | undefined;
  defaultProfilePhotoUrl: string = environment.defaultProfilePhotoUrl;
  defaultCoverPhotoUrl: string = environment.defaultCoverPhotoUrl;

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private userService: UserService,
    private thisDialogRef: MatDialogRef<PhotoUploadDialogComponent>,
    private router: Router,

    private matSnackbar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data.uploadType === 'profilePhoto') {
      this.photoPreviewUrl = this.data.authUser.profilePhoto ? this.data.authUser.profilePhoto : this.defaultProfilePhotoUrl;
    } else if (this.data.uploadType === 'coverPhoto') {
      this.photoPreviewUrl = this.data.authUser.coverPhoto ? this.data.authUser.coverPhoto : this.defaultCoverPhotoUrl;
    }
  }

  previewPhoto(e: any): void {
    if (e.target.files) {
      this.photo = e.target.files[0];
      if (this.photo) {
        const reader = new FileReader();
        reader.readAsDataURL(this.photo);
        reader.onload = (e: any) => {
          this.photoPreviewUrl = e.target.result;
        }
      }
    }
  }
  savePhoto(): void {
    if (this.photo) {
      let updateObservable: Observable<any> | null = null; // Initialize to null
  
      if (this.data.uploadType === 'profilePhoto') {
        updateObservable = this.userService.updateProfilePhoto(this.photo);
      } else if (this.data.uploadType === 'coverPhoto') {
        updateObservable = this.userService.updateCoverPhoto(this.photo);
      }
  
      if (updateObservable) {
        updateObservable.subscribe(
          (response) => {
            // Handle success, if needed
            console.log('Photo updated successfully.');
            this.thisDialogRef.close(); // Close the dialog
          },
          (error) => {
            // Handle error
            console.error('Error updating photo:', error);
            this.matSnackbar.open('Failed to update photo. Please try again.', 'Close', { duration: 3000 });
          }
        );
      } else {
        console.error('Invalid upload type.');
        this.matSnackbar.open('Invalid upload type.', 'Close', { duration: 3000 });
      }
    } else {
      console.error('No photo selected.');
      this.matSnackbar.open('No photo selected.', 'Close', { duration: 3000 });
    }
    this.router.navigateByUrl(`user/profile`).then(() => {
			window.location.reload();
		});
  }
  
}
