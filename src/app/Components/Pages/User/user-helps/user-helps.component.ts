// user-helps.component.ts

import { Component, OnInit } from '@angular/core';
import { Help } from 'src/app/Model/User/help';
import { UserService } from 'src/app/services/User/UserService';


@Component({
  selector: 'app-user-helps',
  templateUrl: './user-helps.component.html',
  styleUrls: ['./user-helps.component.css']
})
export class UserHelpsComponent implements OnInit {

  helps: Help[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadHelps();
  }

  loadHelps(): void {
    this.userService.getAllHelps().subscribe(
      (helps: Help[]) => {
        this.helps = helps;
      },
      (error) => {
        console.error('Error fetching helps:', error);
      }
    );
  }
}
