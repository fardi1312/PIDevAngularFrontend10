import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/User/UserService';

@Component({
  selector: 'app-update-cover-photo-profile',
  templateUrl: './update-cover-photo-profile.component.html',
  styleUrls: ['./update-cover-photo-profile.component.css']
})
export class UpdateCoverPhotoProfileComponent {
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpdateCoverPhoto() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }
  
    this.userService.updateCoverPhoto(this.selectedFile).subscribe(
      (response: any) => {
        console.log(response); // Log the response for debugging purposes
        console.log('Cover photo updated successfully');
        // Handle success, such as displaying a success message
      },
      (error: any) => {
        console.error('Error updating cover photo:', error);
        // Handle error, such as displaying an error message
      }
    );
  }
}
