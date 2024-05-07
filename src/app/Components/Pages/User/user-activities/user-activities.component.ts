import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/UserService';

@Component({
  selector: 'app-user-activities',
  templateUrl: './user-activities.component.html',
  styleUrls: ['./user-activities.component.css']
})
export class UserActivitiesComponent implements OnInit {
  userActivities: string[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserActivities();
  }

  getUserActivities(): void {
    this.userService.getUserActivitiesByConnectedUserId().subscribe(
      (activities: string[]) => {
        this.userActivities = activities;
      },
      (error) => {
        console.error('Error fetching user activities:', error);
      }
    );
  }
}
