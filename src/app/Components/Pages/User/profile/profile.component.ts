import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User/user';
import { UserService } from 'src/app/Services/User/UserService';
import { MatDialog } from '@angular/material/dialog';
import { PhotoUploadDialogComponent } from '../photo-upload-dialog/photo-upload-dialog.component';
import { ViewPhotoDialogComponent } from '../view-photo-dialog/view-photo-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isProfileViewerOwner: boolean | undefined;
  user: User | undefined;
  imageUrl: string | undefined;
  authenticationError = false;
  authUser: any;
  coverPhotoUrl: string | undefined;

  constructor(private userService: UserService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getAuthenticatedUser().subscribe(
      (user: User) => {
        this.user = user;
        this.loadProfilePhotoUrl();
        this.loadCoverPhotoUrl();
      },
      (error) => {
        console.error('Error fetching authenticated user:', error);
        this.authenticationError = true;
      }
    );
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
  
  loadCoverPhotoUrl(): void {
    // Fetch cover photo URL
    this.userService.getCoverPhotoUrl().subscribe(
      (coverPhotoUrl: string) => {
        this.coverPhotoUrl = coverPhotoUrl;
        this.isProfileViewerOwner = true;
      },
      (error) => {
        console.error('Error fetching cover photo URL:', error);
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
        if (uploadType === 'profilePhoto' && this.user) {
          this.user.profilePhoto = result.updatedUser.profilePhoto || '';
        } else if (uploadType === 'coverPhoto' && this.user) {
          this.user.coverPhoto = result.updatedUser.coverPhoto ?? '';
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
