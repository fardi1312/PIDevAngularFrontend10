import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User/user';
import { AdminService } from 'src/app/Services/User/AdminService';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  totalUserCount: number | null = null;
  errorMessage: any;

  constructor(private adminService: AdminService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getTotalUserCount();
  }

  getAllUsers(): void {
    this.adminService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching all users:', error);
      }
    );
  }

  deleteUser(email: string): void {
    this.adminService.deleteUser(email).subscribe(
      () => {
        console.log('User deleted successfully');
        this.getAllUsers(); // Refresh user list after deletion
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  disableUser(email: string): void {
    this.adminService.disableUserAccount(email).subscribe(
      () => {
        console.log('User account disabled successfully');
        this.getAllUsers(); // Refresh user list after account disablement
      },
      (error) => {
        console.error('Error disabling user account:', error);
      }
    );
  }

  enableUser(email: string): void {
    this.adminService.enableUserAccount(email).subscribe(
      () => {
        console.log('User account enabled successfully');
        this.getAllUsers(); // Refresh user list after account enablement
      },
      (error) => {
        console.error('Error enabling user account:', error);
      }
    );
  }

  getTotalUserCount(): void {
    this.adminService.getTotalUserCount().subscribe(
      (count) => {
        this.totalUserCount = count;
      },
      (error) => {
        console.error('Error fetching total user count:', error);
      }
    );
  }

  openUserDetailsDialog(email: string): void {
    this.adminService.getUserByEmail(email).subscribe(
      (user) => {
        this.dialog.open(UserDetailsDialogComponent, {
          data: user
        });
      },
      (error) => {
        console.error('Error fetching user by email:', error);
      }
    );
  }
}
