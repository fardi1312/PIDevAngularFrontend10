import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Club } from 'src/app/Model/Collocation/Club';
import { ClubService } from 'src/app/Services/Collocation/club.service';

@Component({
  selector: 'app-show-clubs',
  templateUrl: './show-clubs.component.html',
  styleUrls: ['./show-clubs.component.css']
})
export class ShowClubsComponent  implements OnInit{ 
  clubs : Club[] = [] ;  
  club:Club = {
    id: 0,
    name: '',
    description: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    category: Category.SPORTS,
    registrationDate: new Date(),
    logo: '',
    members: []
  };       
   
  loadClubs() {
    this.clubService.getAllClubs().subscribe (
      (data) => {
        this.clubs = data; 
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    ); 

  } 



  constructor(private clubService:ClubService , private router: Router) {}
  ngOnInit(): void { 
    this.loadClubs() ;
  }




}
