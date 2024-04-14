
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/User/UserService';
import { MatDialog } from '@angular/material/dialog';
import { PhotoUploadDialogComponent } from '../photo-upload-dialog/photo-upload-dialog.component';
import { ViewPhotoDialogComponent } from '../view-photo-dialog/view-photo-dialog.component';
import { PostResponse } from "../../../../Model/User/post-response";
import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { SnackbarComponent } from "../../Forum/snackbar/snackbar.component";
import { AppConstants } from "../../../../Common/app-constants";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from '../../Forum/confirmation-dialog/confirmation-dialog.component';
import { FollowingFollowerListDialogComponent } from '../../Forum/following-follower-list-dialog/following-follower-list-dialog.component';
import { PostDialogComponent } from '../../Forum/post-dialog/post-dialog.component';
import { UserResponse } from 'src/app/Model/User/user-response';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/Environments/environment';
import { User } from 'src/app/Model/User/user';


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

  ////////////////////////////////
  profileUserPostResponses: PostResponse[] = [];
  viewerFollowsProfileUser: boolean = false;
  resultPage: number = 1;
  resultSize: number = 5;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  loadingProfile: boolean = false;
  hasNoPost: boolean = false;
  private subscriptions: Subscription[] = [];
  profileUserId!: number;


  ////////////////////////////////////
  constructor(private userService: UserService,
    private matSnackbar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,


    private matDialog: MatDialog) { }
    ngOnInit(): void {
      this.userService.getAuthenticatedUser().subscribe(
        (user: User) => {
          this.user = user;
          this.loadProfilePhotoUrl();
          this.loadCoverPhotoUrl();
          this.loadProfilePosts(1);
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


        if (imageUrl){
        this.imageUrl = imageUrl;
        this.isProfileViewerOwner = true;
        }
        if (!imageUrl) {
          this.imageUrl = environment.defaultProfilePhotoUrl;
          this.isProfileViewerOwner = false;
        }
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
        if (coverPhotoUrl) {
          this.coverPhotoUrl = coverPhotoUrl;
          this.isProfileViewerOwner = true;
        }

        if (!coverPhotoUrl) {
          this.coverPhotoUrl = environment.defaultCoverPhotoUrl;
          this.isProfileViewerOwner = true;
        }
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



//////////////////////////////////////
loadProfilePosts(currentPage: number): void {
  if (!this.fetchingResult) {
      this.fetchingResult = true;
      this.userService.getIdAuthenticatedUser().subscribe(
          (userId: number) => {
              this.subscriptions.push(
                  this.userService.getUserPosts1(userId, currentPage, this.resultSize).subscribe(
                      (result: PostResponse[] | HttpErrorResponse) => {
                          if (result instanceof Array) {
                              result.forEach(post => this.profileUserPostResponses.push(post));
                              if (result.length <= 0 && this.resultPage === 1) this.hasNoPost = true;
                              if (result.length <= 0) this.hasMoreResult = false;
                              this.fetchingResult = false;
                              this.resultPage++;
                          } else {
                              this.matSnackbar.openFromComponent(SnackbarComponent, {
                                  data: AppConstants.snackbarErrorContent,
                                  panelClass: ['bg-danger'],
                                  duration: 5000
                              });
                          }
                      }
                  )
              );
          },
          (error) => {
              console.error('Error fetching authenticated user ID:', error);
              // Handle error appropriately
          }
      );
  }
}



	openFollowConfirmDialog(userId: number): void {
const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
  data: `Do you want to follow ${this.user?.firstName ?? ''} ${this.user?.lastName ?? ''}?`,
  autoFocus: false,
  maxWidth: '500px'
});

		dialogRef.afterClosed().subscribe(
			(result) => {
				if (result) {
					this.subscriptions.push(
						this.userService.followUser(userId).subscribe({
							next: (response: any) => {
								this.viewerFollowsProfileUser = true;
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: `You are following ${this.user?.firstName + ' ' + this.user?.lastName}.`,
									duration: 5000
								});
							},
							error: (errorResponse: HttpErrorResponse) => {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: ['bg-danger'],
									duration: 5000
								});
							}
						})
					);
				}
			}
		);
	}
	openUnfollowConfirmDialog(userId: number): void {
		const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
			data: `Do you want to stop following ${this.user?.firstName + ' ' + this.user?.lastName}?`,
			autoFocus: false,
			maxWidth: '500px'
		});

		dialogRef.afterClosed().subscribe(
			(result) => {
				if (result) {
					this.subscriptions.push(
						this.userService.unfollowUser(userId).subscribe({
							next: (response: any) => {
								this.viewerFollowsProfileUser = false;
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: `You no longer follow ${this.user?.firstName + ' ' + this.user?.lastName}.`,
									duration: 5000
								});
							},
							error: (errorResponse: HttpErrorResponse) => {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: ['bg-danger'],
									duration: 5000
								});
							}
						})
					);
				}
			}
		);
	}
	openFollowingDialog(user: User): void {
		this.matDialog.open(FollowingFollowerListDialogComponent, {
			data: {
				user,
				type: 'following'
			},
			autoFocus: false,
			minWidth: '400px',
			maxWidth: '500px'
		});
	}

	openFollowerDialog(user: User): void {
		this.matDialog.open(FollowingFollowerListDialogComponent, {
			data: {
				user,
				type: 'follower'
			},
			autoFocus: false,
			minWidth: '400px',
			maxWidth: '500px'
		});
	}
	stopPropagation(e: Event): void {
		e.stopPropagation();
	}
  ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
  handlePostDeletedEvent(postResponse: PostResponse): void {
    const element = document.getElementById(`profilePost${postResponse.post.id}`);
    if (element) {
        element.remove();
    }
}



openPostDialog(): void {
  this.matDialog.open(PostDialogComponent, {
    data: null,
    autoFocus: false,
    minWidth: '500px',
    maxWidth: '700px'
  });
}

}
