import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/Common/app-constants';
import { CommentLikeDialogComponent } from '../comment-like-dialog/comment-like-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { environment } from "../../../../Environments/environment";
import { CommentResponse } from "../../../../Model/User/comment-response";
import { Post } from "../../../../Model/User/post";
import { AuthService } from "../../../../Services/User/AuthService";
import { PostService } from "../../../../Services/Forum/post.service";
import { CommentService } from "../../../../Services/Forum/comment.service";
import {Comment} from "../../../../Model/User/comment";
import { UserService } from 'src/app/Services/User/UserService';

@Component({
	selector: 'app-post-comment-dialog',
	templateUrl: './post-comment-dialog.component.html',
	styleUrls: ['./post-comment-dialog.component.css']
})
export class PostCommentDialogComponent implements OnInit, OnDestroy {
	@Output() updatedCommentCountEvent = new EventEmitter<number>();
	@Output() newItemEvent = new EventEmitter<string>();
	authUserId!: number;
	commentResponseList: CommentResponse[] = [];
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = false;
	fetchingResult: boolean = false;
	creatingComment: boolean = false;
	commentFormGroup!: FormGroup;
	defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;
	imageUrl: string | undefined;

	private subscriptions: Subscription[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public dataPost: Post,
		private authService: AuthService,
		private postService: PostService,
		private commentService: CommentService,
		private formBuilder: FormBuilder,
		private matDialog: MatDialog,
		private userService: UserService,
		private matSnackbar: MatSnackBar
	) { }

	get content() { return this.commentFormGroup.get('content') }

	ngOnInit(): void {
		this.userService.getIdAuthenticatedUser().subscribe((userId: number) => {
			this.authUserId = userId;
		});

		this.commentFormGroup = this.formBuilder.group({
			content: new FormControl('', [Validators.required, Validators.maxLength(1024)])
		});
		this.loadProfilePhotoUrl();

		this.loadComments(1);
	}

	loadProfilePhotoUrl(): void {
		this.userService.getProfilePhotoUrl1(this.authUserId ).subscribe(
		  (imageUrl: string) => {
			if (imageUrl){
			this.imageUrl = imageUrl;
			}
			if (!imageUrl) {
			  this.imageUrl = environment.defaultProfilePhotoUrl;
			}
		  },
		  (error) => {
			console.error('Error fetching profile photo URL:', error);
		  }
		);
	  }










	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	loadComments(currentPage: number): void {
		if (!this.fetchingResult) {
			if (this.dataPost.commentCount > 0) {
				this.fetchingResult = true;

				this.subscriptions.push(
					this.postService.getPostComments(this.dataPost.id, currentPage, this.resultSize).subscribe(
						(result: CommentResponse[] | HttpErrorResponse) => {
							if (result instanceof Array) {
								this.commentResponseList.push(...result);
								if (currentPage * this.resultSize < this.dataPost.commentCount) {
									this.hasMoreResult = true;
								} else {
									this.hasMoreResult = false;
								}
								this.resultPage++;
							} else {
								console.error('HTTP Error:', result);
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: ['bg-danger'],
									duration: 5000
								});
							}
							this.fetchingResult = false;
						}
					)
				);
			}
		}
	}

	createNewComment(): void {
		this.creatingComment = true;
		this.subscriptions.push(
			this.postService.createPostComment(this.dataPost.id, this.content?.value).subscribe(
				(result: CommentResponse | HttpErrorResponse) => {
					if (result instanceof CommentResponse) {
						this.commentFormGroup.reset();
						Object.keys(this.commentFormGroup.controls).forEach(key => {
							const control = this.commentFormGroup.get(key);
							if (control) {
								control.setErrors(null);
							}
						});
						this.commentResponseList.unshift(result);
						this.updatedCommentCountEvent.emit(this.commentResponseList.length);
						this.creatingComment = false;
					} else {
						this.matSnackbar.openFromComponent(SnackbarComponent, {
							data: 'create comment successfully ',
							panelClass: ['bg-danger'],

							duration: 5000
							
						});
						this.creatingComment = true;
					}
					this.creatingComment = true;
					this.loadComments(1); 

				}
			)
		);
	}
	openCommentLikeDialog(comment: Comment): void {
		this.matDialog.open(CommentLikeDialogComponent, {
			data: comment,
			minWidth: '500px',
			maxWidth: '700px'
		});
	}

	likeOrUnlikeComment(commentResponse: CommentResponse) {
		if (commentResponse.likedByAuthUser) {
			this.subscriptions.push(
				this.commentService.unlikeComment(commentResponse.comment.id).subscribe({
					next: (response: any) => {
						const targetCommentResponse = this.commentResponseList.find(cR => cR === commentResponse);
						if (targetCommentResponse) {
							targetCommentResponse.likedByAuthUser = false;
							targetCommentResponse.comment.likeCount--;
						}
					},
					error: (errorResponse: HttpErrorResponse) => {
						console.error('HTTP Error:', errorResponse);
						this.matSnackbar.openFromComponent(SnackbarComponent, {
							data: AppConstants.snackbarErrorContent,
							panelClass: ['bg-danger'],
							duration: 5000
						});
					}
				})
			);
		} else {
			this.subscriptions.push(
				this.commentService.likeComment(commentResponse.comment.id).subscribe({
					next: (response: any) => {
						const targetCommentResponse = this.commentResponseList.find(cR => cR === commentResponse);
						if (targetCommentResponse) {
							targetCommentResponse.likedByAuthUser = true;
							targetCommentResponse.comment.likeCount++;
						}
					},
					error: (errorResponse: HttpErrorResponse) => {
						console.error('HTTP Error:', errorResponse);
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

	openCommentDeleteConfirmDialog(commentResponse: CommentResponse): void {
		const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
			data: 'Do you want to delete this comment permanently?',
			autoFocus: false,
			width: '500px'
		});

		dialogRef.afterClosed().subscribe(
			result => {
				if (result) this.deleteComment(commentResponse);
			}
		);
	}

	private deleteComment(commentResponse: CommentResponse) {
		this.subscriptions.push(
			this.commentService.deleteComment(this.dataPost.id, commentResponse.comment.id).subscribe({
				next: (response: any) => {
					const targetIndex = this.commentResponseList.indexOf(commentResponse);
					if (targetIndex !== -1) {
						this.commentResponseList.splice(targetIndex, 1);
						this.updatedCommentCountEvent.emit(this.commentResponseList.length);
						this.matSnackbar.openFromComponent(SnackbarComponent, {
							data: 'Comment deleted successfully.',
							panelClass: ['bg-success'],
							duration: 3000
						});
					}
				},
				error: (errorResponse: HttpErrorResponse) => {
					console.error('HTTP Error:', errorResponse);
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
