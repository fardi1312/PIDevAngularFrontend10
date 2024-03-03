import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { RoomDetails, RoomType } from 'src/app/Model/Collocation/RoomDetails';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-add-collocation',
  templateUrl: './add-collocation.component.html',
  styleUrls: ['./add-collocation.component.css']
})
export class AddCollocationComponent  implements OnInit {
  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    location: '',
    houseType: 0,
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: [],
    roomDetailsList: []
  };
  addRoomDetail(): void {
    this.collocationOffer.roomDetailsList.push({
      idRoomDetails: 0, // or assign a valid id
      roomType: RoomType.SINGLE,
      availablePlaces: 0, // assign the correct value
      prix: 0, // assign the correct value
    });
  }
  
  
  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);

  constructor(private offerService: OfferService, private router: Router) { }
  model = {
    dateOffer: new Date(), 
  };
  ngOnInit(): void {
         this.setDateOfferToSystemDate();
}

  
  houseType: number = 1;

 


  setDateOfferToSystemDate() {
    this.model.dateOffer = new Date(); 
  }

  onSubmit() {
    if (!Array.isArray(this.collocationOffer.roomDetailsList)) {
      console.error('RoomDetails is not an array');
      return;
    }
  
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.map((roomDetail: RoomDetails) => ({
      idRoomDetails: roomDetail.idRoomDetails,
      availablePlaces: roomDetail.availablePlaces,
      roomType: roomDetail.roomType,
      prix: roomDetail.prix,
      
    }));
  
    this.offerService.createCollocation(this.collocationOffer).subscribe(
      (createdOffer: CollocationOffer) => {
        console.log('Offer saved successfully:', createdOffer);
      },
      (error) => {
        console.error('Error saving offer:', error);
      }
    );
}




  goToOfferList() {
    this.router.navigate(['/Collocation/showOffer']);
  }

}
