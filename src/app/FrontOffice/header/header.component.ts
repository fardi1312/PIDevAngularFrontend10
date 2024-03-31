import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/Environments/environment';
import { User } from 'src/app/Model/User/user';
import { UserService } from 'src/app/Services/User/UserService';
import { AuthService } from 'src/app/Services/User/AuthService'; // Import AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authUser: User | undefined;
  user: User | undefined;
  imageUrl: string | undefined;
  authenticationError = false;
  defaultProfilePhotoUrl = environment.defaultProfilePhotoUrl;

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAuthenticatedUser();
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
    this.router.navigateByUrl('');
  }
}
