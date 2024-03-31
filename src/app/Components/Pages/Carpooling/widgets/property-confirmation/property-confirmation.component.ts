
import { Router } from '@angular/router';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { Component,  Input } from '@angular/core';
import { CarpoolingService } from 'src/app/Services/servicesSM/carpoolings.service';

@Component({
  selector: 'app-property-confirmation',
  templateUrl: './property-confirmation.component.html',
  styleUrls: ['./property-confirmation.component.scss']
})
export class PropertyConfirmationComponent {
  @Input() activeCoo: CarpoolingOffer={ locationLx: '',
  locationLy: '',};

  @Input() carpoolingOffers: CarpoolingOffer={ locationLx: '',
  locationLy: '',} ;
  maxPlacesAller: number[]=[0];
  maxPlacesRetour: number[]=[0];
  selectedNbPlacesRetour: number =0 ; 
  selectedNbPlacesAller: number =0;
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
    
    this.carpoolingOffers.dateAller = this.carpoolingOffers.dateAller?.slice(0,-13);
    this.carpoolingOffers.dateRetour = this.carpoolingOffers.dateRetour?.slice(0,-13);
  }

 
  submit(){
    window.location.reload();

  }
}
