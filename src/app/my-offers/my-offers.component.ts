import { Component } from '@angular/core';
import { OfferService } from '../Services/Collocation/offer.service';
import { Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from '../models/Collocation/CollocationOffer';
import { Interest, Pets } from '../models/Collocation/CollocationPreferences';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent { 
  offers: CollocationOffer[] = []; 
  offer  : CollocationOffer = {
    idCollocationOffer: 0,
    locationLx: '',
    locationLy: '',
    houseType: 0,
    saved:false,
    governorate: '',
    country: '',
    city: '',
    streetAddress: '',
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: [],
    smokingAllowed: false,
    petsAllowed: Pets.No,
    interest:Interest.No,
    matchPercentage:0,
    user: undefined as any 


  };

  constructor(private offerService: OfferService,private router: Router) { }

  ngOnInit(): void {
    this.loadOffers();
  }
idUser=2 ; 
  loadOffers() {
    this.offerService.getCollocationOffersByUserId(this.idUser).subscribe(
      (data) => {
        this.offers = data;
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  }
  deleteOffer(id: number){
    this.offerService.deleteCollocationOffer(id).subscribe( data => {
        console.log(data);
        this.loadOffers();
    })
}
updateOffer(id: number){
  this.router.navigate(['user/Collocation/updateOffer', id]);
}
offerDetails(id: number){
  this.router.navigate(['user/Collocation/myOffer', id]);
} 
addFeedback(id: number): void {  
  console.log(id);

  this.router.navigate(['user/Collocation/addFeedback',id ]);
} 
addRequest(id:number) : void 
{ 
  this.router.navigate(['user/Collocation/addRequest',id ]);

}
showRooms(id:number):void
{ 
  this.offerService.getCollocationOfferById(id).subscribe(
    (data) => {
      this.offer= data;
    });
    this.offer.roomDetailsList
} 



}


