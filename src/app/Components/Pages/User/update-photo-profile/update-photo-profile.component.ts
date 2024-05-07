import { Component } from '@angular/core';
import { UserService } from 'src/app/services/User/UserService';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-photo-profile',
  templateUrl: './update-photo-profile.component.html',
  styleUrls: ['./update-photo-profile.component.css']
})
export class UpdatePhotoProfileComponent {
  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpdateProfilePhoto() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      this.errorMessage = 'No file selected. Please choose a file before updating.';
      return;
    }

    this.userService.updateProfilePhoto(this.selectedFile).subscribe(
      () => {
        console.log('Profile photo updated successfully');
        // Handle successful photo update here
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to update profile photo:', error);
        this.errorMessage = 'Failed to update profile photo';
        // Handle error here
      }
    );
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  displaySelectedImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
