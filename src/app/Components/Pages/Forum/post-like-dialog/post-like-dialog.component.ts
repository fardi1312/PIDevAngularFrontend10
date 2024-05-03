import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AppConstants } from 'src/app/Common/app-constants';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { User } from "../../../../Model/User/user";
import { environment } from "../../../../Environments/environment";
import { Post } from "../../../../Model/User/post";
import { PostService } from "../../../../Services/Forum/post.service";
import { UserService } from 'src/app/Services/User/UserService';

@Component({
  selector: 'app-post-like-dialog',
  templateUrl: './post-like-dialog.component.html',
  styleUrls: ['./post-like-dialog.component.css']
})
export class PostLikeDialogComponent implements OnInit, OnDestroy {
  likeList: User[] = [];
  resultPage: number = 1;
  resultSize: number = 5;
  hasMoreResult: boolean = false;
  fetchingResult: boolean = false;
  defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;
  imageUrl!: string;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataPost: Post,
    private postService: PostService,
    private userService: UserService,
    private matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadLikes(1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadProfilePhotoUrl(userId: number): void {
    this.userService.getProfilePhotoUrl1(userId).subscribe(
      (imageUrl: string) => {
        // Update the imageUrl property with the fetched URL
        const like = this.likeList.find(like => like.idUser === userId);
        if (like) {
          this.imageUrl =  imageUrl;
        }
      },
      (error) => {
        console.error('Error fetching profile photo URL:', error);
        this.matSnackbar.openFromComponent(SnackbarComponent, {
          data: 'Error fetching profile photo URL',
          panelClass: ['bg-danger'],
          duration: 5000
        });
      }
    );
  }

  loadLikes(currentPage: number): void {
    if (!this.fetchingResult) {
      if (this.dataPost.likeCount > 0) {
        this.fetchingResult = true;
        this.subscriptions.push(
          this.postService.getPostLikes(this.dataPost.id, currentPage, this.resultSize).subscribe(
            (result: User[] | HttpErrorResponse) => {
              if (result instanceof Array) {
                result.forEach(like => {
                  this.likeList.push(like);
                  this.loadProfilePhotoUrl(like.idUser); // Load profile photo for each user
                });
                if (currentPage * this.resultSize < this.dataPost.likeCount) {
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
}
