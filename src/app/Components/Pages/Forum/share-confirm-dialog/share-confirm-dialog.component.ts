import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/Common/app-constants';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import {environment} from "../../../../Environments/environment";
import {Post} from "../../../../Model/User/post";
import {PostService} from "../../../../services/Forum/post.service";

@Component({
	selector: 'app-share-confirm-dialog',
	templateUrl: './share-confirm-dialog.component.html',
	styleUrls: ['./share-confirm-dialog.component.css']
})
export class ShareConfirmDialogComponent implements OnInit, OnDestroy {
	targetPostId!: number;
	shareFormGroup!: FormGroup;
	creatingShare: boolean = false;
	defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;

	private subscriptions: Subscription[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public dataPost: Post,
		private thisMatDialogRef: MatDialogRef<ShareConfirmDialogComponent>,
		private router: Router,
		private postService: PostService,
		private formBuilder: FormBuilder,
		private matSnackbar: MatSnackBar) { }

	get content() { return this.shareFormGroup.get('content'); }

	ngOnInit(): void {
		this.shareFormGroup = this.formBuilder.group({
			content: new FormControl('', [Validators.maxLength(4096)])
		});

		this.targetPostId = this.dataPost.isTypeShare ? this.dataPost.sharedPost.id : this.dataPost.id;
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	createNewPostShare(): void {
		if (!this.creatingShare && this.content?.value) {
			this.creatingShare = true;
			this.subscriptions.push(
				this.postService.createPostShare(this.targetPostId, this.content.value).subscribe(
					(result: Post | HttpErrorResponse) => {
						if (result instanceof Post) {
							this.thisMatDialogRef.close();
							this.matSnackbar.openFromComponent(SnackbarComponent, {
								data: 'Post shared successfully.',
								panelClass: ['bg-error'],
								duration: 5000
							});
							this.creatingShare = false;
						} else {
							this.matSnackbar.openFromComponent(SnackbarComponent, {
								data: 'Post shared successfully.',
								panelClass: ['bg-error'],
								duration: 5000
							});
							this.creatingShare = false;

						}

						this.router.navigateByUrl(`user/profile`).then(() => {
							window.location.reload();
						});

					}
				)
			);
		}
	}
}
