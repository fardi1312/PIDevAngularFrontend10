import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/UserService';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(private userService: UserService,    
              private router: Router
              ) { }

  onDeleteUser() {
    this.userService.deleteUser().subscribe(
      () => {
        console.log('User deleted successfully');
        this.router.navigateByUrl('');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
