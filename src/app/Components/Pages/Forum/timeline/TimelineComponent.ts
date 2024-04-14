import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/Common/app-constants';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Tag } from "../../../../Model/User/tag";
import { PostResponse } from "../../../../Model/User/post-response";
import { AuthService } from "../../../../Services/User/AuthService";
import { TimelineService } from "../../../../Services/Forum/timeline.service";
import { PostService } from "../../../../Services/Forum/post.service";
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit, OnDestroy {
	timelinePostResponseList: PostResponse[] = [];
	timelineTagList: Tag[] = [];
	noPost: boolean = false;
	resultPage: number = 1;
	resultSize: number = 5;
	hasMoreResult: boolean = true;
	fetchingResult: boolean = false;
	isTaggedPostPage: boolean = false;
	targetTagName!: string | null;
	loadingTimelinePostsInitially: boolean = true;
	loadingTimelineTagsInitially: boolean = true;
	private subscriptions: Subscription[] = [];

	constructor(
		private authService: AuthService,
		private timelineService: TimelineService,
		private postService: PostService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private matDialog: MatDialog,
		private matSnackbar: MatSnackBar) { }

	ngOnInit(): void {

		this.loadTimelinePosts(1);
		this.loadTimelineTags();

	}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	loadTimelinePosts(currentPage: number): void {
		if (!this.fetchingResult) {
			this.fetchingResult = true;
			this.subscriptions.push(
				this.timelineService.getTimelinePosts(currentPage, this.resultSize).subscribe(
					(result: PostResponse[] | HttpErrorResponse) => {
						if (result instanceof Array) {
							if (result.length === 0 && currentPage === 1) this.noPost = true;

							result.forEach(pR => this.timelinePostResponseList.push(pR));
							if (result.length > 0) { 
								this.hasMoreResult = true;
							} else {
								this.hasMoreResult = false;
							}
							this.resultPage++;
							this.fetchingResult = false;
							this.loadingTimelinePostsInitially = false;
						} 
						
						else {
							this.matSnackbar.openFromComponent(SnackbarComponent, {
								data: AppConstants.snackbarErrorContent,
								panelClass: ['bg-danger'],
								duration: 5000
							});
							this.fetchingResult = false;
						}
					}
				)
			);
		}
	}

	loadTaggedPosts(tagName: string | null, currentPage: number): void {
		if (!this.fetchingResult) {
			this.fetchingResult = true;
			if (tagName != null) {
				this.subscriptions.push(
					this.postService.getPostsByTag(tagName, currentPage, this.resultSize).subscribe(
						(result: PostResponse[] | HttpErrorResponse) => {
							if (result instanceof Array) {
								if (result.length === 0 && currentPage === 1) this.noPost = true;
								result.forEach(pR => this.timelinePostResponseList.push(pR));
								if (result.length > 0) {
									this.hasMoreResult = true;
								} else {
									this.hasMoreResult = false;
								}
								this.resultPage++;
								this.fetchingResult = false;
							} else {
								this.matSnackbar.openFromComponent(SnackbarComponent, {
									data: AppConstants.snackbarErrorContent,
									panelClass: ['bg-danger'],
									duration: 5000
								});
								this.fetchingResult = false;
							}
						}
					)
				);
			}
		}
	}

	loadTimelineTags(): void {
		this.fetchingResult = true;
		this.subscriptions.push(
			this.timelineService.getTimelineTags().subscribe(
				(result: Tag[] | HttpErrorResponse) => {
					if (result instanceof Array) {
						result.forEach(t => this.timelineTagList.push(t));
						this.loadingTimelineTagsInitially = false;
						this.fetchingResult = false;
					} else {
						this.matSnackbar.openFromComponent(SnackbarComponent, {
							data: AppConstants.snackbarErrorContent,
							panelClass: ['bg-danger'],
							duration: 5000
						});
						this.fetchingResult = false;
					}
				}
			)
		);
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
