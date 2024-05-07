import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/Environments/environment';
import { UserResponse } from 'src/app/Model/User/user-response';
import { UserService } from 'src/app/services/User/UserService';
import { SnackbarComponent } from '../../Forum/snackbar/snackbar.component';
import { AppConstants } from 'src/app/Common/app-constants';
import { ConfirmationDialogComponent } from '../../Forum/confirmation-dialog/confirmation-dialog.component';

@Component({
	selector: 'app-search-dialog',
	templateUrl: './search-dialog.component.html',
	styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit, OnDestroy {
	searchResult: UserResponse[] = [];
	searchUserFormGroup!: FormGroup;
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = false;
	noResult: boolean = false;
	fetchingResult: boolean = false;
	defaultProfilePhotoUrl: string = environment.defaultProfilePhotoUrl;

	private subscriptions: Subscription[] = [];

	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private matSnackbar: MatSnackBar,
		private matDialog: MatDialog,
		private router: Router) { }

	get key() { return this.searchUserFormGroup.get('key'); }

	ngOnInit(): void {
		this.searchUserFormGroup = this.formBuilder.group({
			key: new FormControl('', [Validators.minLength(3), Validators.maxLength(64)])
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	searchUser(currentPage: number): void {
		if (!this.fetchingResult) {
			if (this.key && this.key.value && this.key.value.length >= 3) {
				this.fetchingResult = true;
	
				if (currentPage === 1) this.searchResult = [];
	
				this.subscriptions.push(
					this.userService.getUserSearchResult(this.key.value, currentPage, this.resultSize).subscribe(
						(response: UserResponse[] | HttpErrorResponse) => {
							if (response instanceof HttpErrorResponse) {
								// Handle HTTP error response
								this.fetchingResult = false;
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: 'bg-danger',
									duration: 5000
								});
							} else {
								// Handle successful response
								const resultList: UserResponse[] = response;
								if (resultList.length <= 0 && currentPage === 1) {
									this.noResult = true;
								} else {
									this.noResult = false;
								}
				
								resultList.forEach(uR => this.searchResult.push(uR));
								this.resultPage++;
								this.fetchingResult = false;
				
								if (resultList.length < this.resultSize) {
									this.hasMoreResult = false;
									this.resultPage = 1;
								} else {
									this.hasMoreResult = true;
								}
							}
						}
					)
				);
				
			} else {
				this.matSnackbar.openFromComponent(SnackbarComponent, {
					data: 'Search key must be between 3 to 64 characters long.',
					panelClass: ['bg-danger'],
					duration: 5000
				});
			}
		}
	} 

	openFollowConfirmDialog(userResponse: UserResponse): void {
		const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
			data: `Do you want to follow this ${userResponse.user.firstName + ' ' + userResponse.user.lastName}?`,
			autoFocus: false,
			maxWidth: '500px'
		});

		dialogRef.afterClosed().subscribe(
			(result) => {
				if (result) {
					this.subscriptions.push(
						this.userService.followUser(userResponse.user.idUser).subscribe(
							(response: any) => {
								const targetResult = this.searchResult.find(uR => uR === userResponse);
								if (targetResult) {
									targetResult.followedByAuthUser = true;
								}
	
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: `You are now following ${userResponse.user.firstName + ' ' + userResponse.user.lastName}.`,
									duration: 5000
								});
							},
							(errorResponse: HttpErrorResponse) => {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: 'bg-danger',
									duration: 5000
								});
							}
						)
					);
				}
			}
		);
	}

	openUnfollowConfirmDialog(userResponse: UserResponse): void {
		const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
			data: `Do you want to stop following ${userResponse.user.firstName + ' ' + userResponse.user.lastName}?`,
			autoFocus: false,
			maxWidth: '500px'
		});

		dialogRef.afterClosed().subscribe(
			(result) => {
				if (result) {
					this.subscriptions.push(
						this.userService.unfollowUser(userResponse.user.idUser).subscribe(
							(response: any) => {
								const targetResult = this.searchResult.find(uR => uR === userResponse);
								if (targetResult) {
									targetResult.followedByAuthUser = false;
								}
	
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: `You no longer follow ${userResponse.user.firstName + ' ' + userResponse.user.lastName}.`,
									duration: 5000
								});
							},
							(errorResponse: HttpErrorResponse) => {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: 'bg-danger',
									duration: 5000
								});
							}
						)
					);
				}
			}
		);
	}
}
