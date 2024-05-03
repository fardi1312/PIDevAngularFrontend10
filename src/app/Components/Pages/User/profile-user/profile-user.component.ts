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
import { AuthService } from 'src/app/Services/User/AuthService';
import { User } from 'src/app/Model/User/user';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {
	user: User | undefined;
	imageUrl: string | undefined;
	authenticationError = false;
	authUser: any;
	coverPhotoUrl: string | undefined;
  
	////////////////////////////////
	profileUserPostResponses: PostResponse[] = [];
	viewerFollowsProfileUser!: boolean ;
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = true;
	fetchingResult: boolean = false;
	loadingProfile: boolean = false;
	hasNoPost: boolean = false;
	private subscriptions: Subscription[] = [];
	profileUserId!: number;
	userid!: number;
	isVerified!: boolean ;
  
	////////////////////////////////////
	constructor(private userService: UserService,
	  private matSnackbar: MatSnackBar,
	  private router: Router,
	  private activatedRoute: ActivatedRoute,
  
  
	  private matDialog: MatDialog) { }

	  
	  ngOnInit(): void {
		this.userService.getIdAuthenticatedUser().subscribe(
			(userId: number) => {
				this.userid = userId;
	
				console.log('User ID:', this.userid);
	
				this.profileUserId = Number(this.activatedRoute.snapshot.paramMap.get('userId'));
				if (this.profileUserId === this.userid) {
					this.router.navigateByUrl('/user/profile');
				} else {
					this.subscriptions.push(
						this.userService.getUserById(this.profileUserId).subscribe(
							(response: UserResponse | HttpErrorResponse) => {
								if (response instanceof HttpErrorResponse) {
									const errorResponse: HttpErrorResponse = response;
									this.handleErrorResponse(errorResponse);
								} else {
									const foundUserResponse: UserResponse = response;
									this.handleSuccessfulResponse(foundUserResponse);
	                               this.viewerFollowsProfileUser = response.followedByAuthUser;
								}
							}
						)
					);
	
					this.loadProfilePhotoUrl();
					this.loadCoverPhotoUrl();
					this.loadProfilePosts(1);

					this.userService.isAccountVerifiedByUserId(this.profileUserId).subscribe(
						(isVerified: boolean) => {
							this.isVerified = isVerified;
						}
					);
				}
			},
			(error) => {
				console.error('Error fetching authenticated user:', error);
				this.authenticationError = true;
			}
		);
	}
	
	
	  
	  
	  private handleErrorResponse(errorResponse: HttpErrorResponse): void {
		this.loadingProfile = false;
		this.router.navigateByUrl('/message');
	  }
	  
	  private handleSuccessfulResponse(foundUserResponse: UserResponse): void {
		const foundUser: User = foundUserResponse.user;
		foundUser.profilePhoto = foundUser.profilePhoto || environment.defaultProfilePhotoUrl;
		foundUser.coverPhoto = foundUser.coverPhoto || environment.defaultCoverPhotoUrl;
		this.user = foundUser;
		this.loadProfilePosts(1);
		this.loadingProfile = false;
	  }
	  
  
	  
  
  
  
  
  
  
  
  
  
  
	loadProfilePhotoUrl(): void {
	  this.userService.getProfilePhotoUrl1(this.profileUserId).subscribe(
		(imageUrl: string) => {
		  if (imageUrl){
		  this.imageUrl = imageUrl;
		  }
		  if (!imageUrl) {
			this.imageUrl = environment.defaultProfilePhotoUrl;
		  }
		},
		(error) => {
			this.router.navigateByUrl('/user/profile');

		  console.error('Error fetching profile photo URL:', error);
		  this.authenticationError = true;
		}
	  );
	}
	
	loadCoverPhotoUrl(): void {
	  // Fetch cover photo URL
	  this.userService.getCoverPhotoUrl1(this.profileUserId).subscribe(
		(coverPhotoUrl: string) => {
		  if (coverPhotoUrl) {
			this.coverPhotoUrl = coverPhotoUrl;
		  }
  
		  if (!coverPhotoUrl) {
			this.coverPhotoUrl = environment.defaultCoverPhotoUrl;
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
	loadProfilePosts(currentPage: number): void {
	  if (!this.fetchingResult) {
		this.fetchingResult = true;
		this.subscriptions.push(
		  this.userService.getUserPosts1(this.profileUserId, currentPage, this.resultSize).subscribe(
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
  