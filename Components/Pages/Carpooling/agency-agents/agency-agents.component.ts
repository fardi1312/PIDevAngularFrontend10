import { Component, Input, OnInit } from '@angular/core';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingRequest } from 'src/app/models/modelSM/CarpoolingRequest';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-agency-agents',
  templateUrl: './agency-agents.component.html',
  styleUrls: ['./agency-agents.component.scss']
})
export class AgencyAgentsComponent implements OnInit {

  @Input() carpoolingOffers: CarpoolingOffer={ locationLx: '',
  locationLy: '',} ;
   carpoolingRequest: CarpoolingRequest = {}; 
  maxPlacesAller: number[]=[0];
  maxPlacesRetour: number[]=[0];
  selectedNbPlacesRetour: number=0  ; 
  selectedNbPlacesAller: number=0 ;
  alert:number=0;
  constructor(private carpoolingService: CarpoolingService) { }
 
  ngOnInit(): void {
    
   
    if (this.carpoolingOffers.placeDispoAller && typeof this.carpoolingOffers.placeDispoAller === 'number') {
      this.maxPlacesAller = Array.from({ length: this.carpoolingOffers.placeDispoAller }, (_, i) => i + 1);
      this.selectedNbPlacesAller=this.carpoolingOffers.placeDispoAller;
    } else {
      
      this.maxPlacesAller = [];
    }
    if (this.carpoolingOffers.placeDispoRetour && typeof this.carpoolingOffers.placeDispoRetour === 'number') {
      this.maxPlacesRetour= Array.from({ length: this.carpoolingOffers.placeDispoRetour }, (_, i) => i + 1);
      this.selectedNbPlacesRetour=this.carpoolingOffers.placeDispoRetour;
    } else {
      
      this.maxPlacesRetour = [];
    }
    
   // this.carpoolingOffers.dateAller = this.carpoolingOffers.dateAller?.slice(0,-1);
   // this.carpoolingOffers.dateRetour = this.carpoolingOffers.dateRetour?.slice(0,-1);
  }

  resetAlert(): void {
    setTimeout(() => {
      this.alert = 0;
    }, 2000); // Hide the alert after 5 seconds (adjust as needed)
  }
  addReq(userId: number, offerId: number, NbPlacesRetour: number, NbPlacesAller: number): void {
   

    this.carpoolingService.AddRequest(userId, offerId, this.carpoolingRequest,NbPlacesRetour,NbPlacesAller).subscribe(
      (addedReq) => {
        console.log('New req added:', addedReq);
        this.carpoolingRequest=addedReq;
        console.log('requestooff',this.carpoolingRequest);
        this.alert = 1; // Set alert to 1 for success
        this.resetAlert(); 
      },
      (error) => {
        console.error('Error adding req:', error);
      }
    );
//this.alert=1;

  }



}
