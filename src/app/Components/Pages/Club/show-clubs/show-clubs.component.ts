import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, Club } from 'src/app/models/Collocation/Club';
import { User } from 'src/app/models/modelMasoud/User';
import { ClubService } from 'src/app/services/Collocation/club.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JoinComponent } from '../join-component/join.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-show-clubs',
  templateUrl: './show-clubs.component.html',
  styleUrls: ['./show-clubs.component.css']
})
export class ShowClubsComponent  implements OnInit{ 
  clubs : Club[] = [] ;   
  message:string|null = null ; 
  club:Club = {
    id: 0,
    name: '',
    description: '',
    facebookUrl: '',
    otherCategory: '',
    twitterUrl: '',
    instagramUrl: '',
    openMembership: false,
    category: Category.SPORTS,
    registrationDate: new Date(),
    logo: '',
    members: [],
    president: new User,
    clubMemberShip: [],
    memberShipApplications: [],
    linkedinUrl: ''
  };     
  idUser=2;  
   
  loadClubs() {
    this.clubService.getAllClubs().subscribe (
      (data) => {
        this.clubs = data;  
        this.fetchImages() ; 
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    ); 

  }    
  fetchImages(): void {
    this.clubs.forEach((offer) => {
      this.clubService.getImageUrl(offer.id).subscribe(
        (imageUrl: string) => {
          offer.logo = imageUrl;
        },
        (error) => {
          console.error("Error fetching  image:", error);
        }
      );
    });
  }

  openModal(club:Club): void {
    const dialogRef = this.dialog.open(JoinComponent);
    
    dialogRef.afterClosed().subscribe(result => { 
      if (result) {   
        this.clubService.addMembershipApplication(club.id,this.idUser,result).subscribe(
          (response) => {  
            console.log('Membership request successfully:', response);
          },
          (error) => {
            console.error('Error adding member:', error);
        
          }
        ); 
        
      }
    })
  }
  
checkUser(club:Club) :number{  
  console.log("jjjjjjj",club ) ;  
  if (this.idUser == club.president.idUser ) { 
    return 1 ; 
  }    
  return 0 ; 

} 
updateInfo(id:number):void{   
  this.router.navigate(['Club/myClub',id ]);

}

NavigateToMember(club: Club): void { 
  console.log("initialized") ;  
  if (club.openMembership) {  
    console.log("entered if") ;  
    this.clubService.addMemberToClub(club.id, this.idUser).subscribe(
      (response) => {
        console.log('Member added successfully:', response);
      },
      (error) => {
        console.error('Error adding member:', error);
    
      }
    ); 
  } 
  else {
    this.openModal(club);
  }

} 

showDetails(id:number)  
{ 
this.router.navigate(['Club/showClub',id ]);
}
constructor(
  private clubService: ClubService,
  private router: Router,
  private dialog: MatDialog
) {}
ngOnInit(): void { 
    this.loadClubs() ; 
  }




}
