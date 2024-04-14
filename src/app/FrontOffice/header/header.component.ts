import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/Environments/environment';
import { User } from 'src/app/Model/User/user';
import { UserService } from 'src/app/Services/User/UserService';
import { AuthService } from 'src/app/Services/User/AuthService';
import { NotificationService } from "../../Services/Forum/notification.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import { AppConstants } from 'src/app/Common/app-constants';
import { Notification } from 'src/app/Model/User/notification';
import { SnackbarComponent } from "../../Components/Pages/Forum/snackbar/snackbar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  authUser: User | undefined;
  user: User | undefined;
  imageUrl: string | undefined;
  authenticationError = false;
  defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;
  isProfilePage: boolean = false;
  hasUnseenNotification: boolean = false;
  resultPage: number = 1;
  resultSize: number = 5;
  hasMoreNotifications: boolean = false;
  fetchingResult: boolean = false;
  private subscriptions: Subscription[] = [];

  notifications: Notification[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private matDialog: MatDialog,
    private matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAuthenticatedUser();
    this.loadNotifications(this.resultPage);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAuthenticatedUser(): void {
    this.userService.getAuthenticatedUser().subscribe(
      (user: User) => {
        this.user = user;
        this.loadProfilePhotoUrl();
        this.authenticationError = false;
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
      },
      (error) => {
        console.error('Error fetching profile photo URL:', error);
        this.authenticationError = true;
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  loadNotifications(page: number): void {
    this.fetchingResult = true;
    this.subscriptions.push(
      this.notificationService.getNotifications(page, this.resultSize).subscribe({
        next: (notificationsOrError: Notification[] | HttpErrorResponse) => {
          if (Array.isArray(notificationsOrError)) {
            // Handle successful response with notifications
            const notifications = notificationsOrError as Notification[];
            this.fetchingResult = false;

            notifications.forEach(n => {
              this.notifications.push(n);
              if (!n.isSeen) this.hasUnseenNotification = true;
            });

            this.hasMoreNotifications = notifications.length > 0;
            this.resultPage++;
          } else {
            // Handle error response
            const errorResponse = notificationsOrError as HttpErrorResponse;
            this.matSnackbar.openFromComponent(SnackbarComponent, {
              data: AppConstants.snackbarErrorContent,
              panelClass: ['bg-danger'],
              duration: 5000
            });
            this.fetchingResult = false;
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          // Handle error in the HTTP request
          this.matSnackbar.openFromComponent(SnackbarComponent, {
            data: AppConstants.snackbarErrorContent,
            panelClass: ['bg-danger'],
            duration: 5000
          });
          this.fetchingResult = false;
        }
      })
    );
  }

  handleUnseenNotifications(): void {
    if (this.hasUnseenNotification) {
      this.subscriptions.push(
        this.notificationService.markAllSeen().subscribe({
          next: (response: any) => {
            this.hasUnseenNotification = false;
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
}
