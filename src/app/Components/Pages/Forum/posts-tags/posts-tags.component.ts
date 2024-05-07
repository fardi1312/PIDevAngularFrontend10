import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/Common/app-constants';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Tag } from "../../../../Model/User/tag";
import { PostResponse } from "../../../../Model/User/post-response";
import { PostService } from "../../../../services/Forum/post.service";
import { TimelineService } from 'src/app/services/Forum/timeline.service';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-posts-tags',
  templateUrl: './posts-tags.component.html',
  styleUrls: ['./posts-tags.component.css']
})

export class PostsTagsComponent implements OnInit, OnDestroy {
  timelinePostResponseList: PostResponse[] = [];
  timelineTagList: Tag[] = []; // Declare and initialize timelineTagList property
  noPost: boolean = false;
  resultPage: number = 1;
  resultSize: number = 5;
  hasMoreResult: boolean = true;
  fetchingResult: boolean = false;
  targetTagName!: string | null;
  loadingTimelinePostsInitially: boolean = true;
  private subscriptions: Subscription[] = [];

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private timelineService: TimelineService,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const tagName = params.get('tagName');
      if (tagName) {
        this.targetTagName = tagName;
        this.loadTaggedPosts(this.targetTagName, this.resultPage);
      }
    });
    this.loadTimelineTags();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
  }

  loadTaggedPosts(tagName: string | null, currentPage: number): void {
    if (!this.fetchingResult && tagName !== null) {
      this.fetchingResult = true;
      this.subscriptions.push(
        this.postService.getPostsByTag(tagName, currentPage, this.resultSize).subscribe(
          (result: PostResponse[] | HttpErrorResponse) => { // Update the type of the parameter
            if (result instanceof HttpErrorResponse) { // Check if the result is an instance of HttpErrorResponse
              this.handleError();
            } else {
              const postResponses = result as PostResponse[]; // Cast the result to PostResponse[]
              if (postResponses.length === 0 && currentPage === 1) {
                this.noPost = true;
              }
  
              postResponses.forEach(pR => this.timelinePostResponseList.push(pR));
              this.hasMoreResult = postResponses.length > 0;
              this.resultPage++;
              this.fetchingResult = false;
              this.loadingTimelinePostsInitially = false; // Move loading flag here
            }
          }
        )
      );
    }
  }


  loadTimelineTags(): void {
		this.fetchingResult = true;
		this.subscriptions.push(
			this.timelineService.getTimelineTags().subscribe(
				(result: Tag[] | HttpErrorResponse) => {
					if (result instanceof Array) {
						result.forEach(t => this.timelineTagList.push(t));
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


  private handleError(): void {
    this.matSnackbar.openFromComponent(SnackbarComponent, {
      data: AppConstants.snackbarErrorContent,
      panelClass: ['bg-danger'],
      duration: 5000
    });
    this.fetchingResult = false;
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
