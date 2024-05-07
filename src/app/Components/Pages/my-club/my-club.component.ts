import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Club } from 'src/app/models/Collocation/Club';
import { ClubMembership } from 'src/app/models/Collocation/ClubMemberShip';
import { RequestEnum } from 'src/app/models/Collocation/CollocationRequest';
import { MemberShipApplication } from 'src/app/models/Collocation/MemberShipApplication';
import { User } from 'src/app/models/modelMasoud/User';
import { ClubService } from 'src/app/services/Collocation/club.service';
import { AssignComponent } from '../Collocation/assign/assign.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-club',
  templateUrl: './my-club.component.html',
  styleUrls: ['./my-club.component.css']
})
export class MyClubComponent implements OnInit {  
  humanResourcesMemberships: ClubMembership[] = []; 
  humanResourcesEmails: string[] = [];
  id!:number ;   
  ngOnInit(): void {   
    this.id = this.route.snapshot.params['id'];   
    console.log(this.id) ;    

    this.clubService.getClubById(this.id).subscribe(data => { 

    this.club = data;   
    console.log(this.club) ;   

       
    this.humanResourcesMemberships = this.club.clubMemberShip.filter(membership => membership.position === 'Human Resources');

    this.humanResourcesEmails = this.humanResourcesMemberships.map(membership => membership.email); 
  
    console.log(this.humanResourcesEmails);
  
    }, error => console.log(error)); 
  
  }   
  openModal(memerbshipApplication: MemberShipApplication): void {
    const dialogRef = this.dialog.open(AssignComponent, {
      data: {
        humanResourcesEmails: this.humanResourcesEmails
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log(result);
        const email = result.assignee; // Extract email from result
        memerbshipApplication.interviewer = email; // Set interviewer to email
        this.clubService.assignInterviewer(memerbshipApplication.id, memerbshipApplication)
          .subscribe(
            (updatedApplication) => {
              console.log('Membership application updated successfully:', updatedApplication);
            },
            (error) => {
              console.error('Error updating membership application:', error);
            }
          );
      }
    });
  }
        
  

  

 ;  
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
  
  
clubMemberShip: ClubMembership[] = [{
  id: 0,
  member: new User(),
  email: '',
  emailVerified: false,
  position: '',
  description: '',  
  date: new Date()
  
}]; 




memberShipApplication: MemberShipApplication[] = [{
  id: 0, 
  club:this.club,  
  date:new Date(),  
  status:RequestEnum.Pending, 
  message :'' ,
  user: new User(), 
  interviewer :'', 
  position:''  
   
}]; 

 
constructor(private clubService:ClubService, private route: ActivatedRoute,private router: Router,private dialog: MatDialog){}


}
 

