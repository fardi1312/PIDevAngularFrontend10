import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Club  } from 'src/app/models/Collocation/Club'; 
import { User } from 'src/app/models/modelMasoud/User';
import { ClubService } from 'src/app/services/Collocation/club.service';

@Component({
  selector: 'app-show-club-details',
  templateUrl: './show-club-details.component.html',
  styleUrls: ['./show-club-details.component.css']
})
export class ShowClubDetailsComponent implements OnInit{ 
  id!:number ; 
  club:Club = {
    id: 0,
    name: '',
    openMembership: false,
    description: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    otherCategory: '',
    category: Category.SPORTS,
    registrationDate: new Date(),
    logo: '',
    members: [],
    president: new User,
    clubMemberShip: [],
    memberShipApplications: [],
    linkedinUrl: ''
  };     
constructor(private clubService:ClubService, private route: ActivatedRoute,private router: Router){}

ngOnInit(): void { 

               
            
  this.id = this.route.snapshot.params['id']; 

  this.clubService.getClubById(this.id).subscribe(data => { 

    this.club = data;   

  }, error => console.log(error)); 

} 




}
