import { Component } from '@angular/core';
import { CollocationOffer, FurnitureCollocation, Gender } from '../models/Collocation/CollocationOffer';
import { OfferService } from '../services/Collocation/offer.service';
import { Router } from '@angular/router';
import { Interest, Pets } from '../models/Collocation/CollocationPreferences';
import { User } from '../models/Collocation/User';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent { 
  offers: CollocationOffer[] = []; 
  offer:CollocationOffer = {
    averageRating: 0,
    idCollocationOffer: 0,
    governorate: '',
    houseType: 0,
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: [],
    locationLx: '',
    locationLy: '',
    country: '',
    city: '',
    streetAddress: '',
    saved: false,
    smokingAllowed: false,
    petsAllowed: Pets.Cats,
    interest: Interest.Sport,
    matchPercentage: 0,
    user: new User
  }; 

  constructor(private offerService: OfferService,private router: Router) { }

  ngOnInit(): void {
    this.loadOffers();
  }
idUser=1; 
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

  this.router.navigate(['Collocation/addFeedback',id ]);
} 
addRequest(id:number) : void 
{ 
  this.router.navigate(['Collocation/addRequest',id ]);

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


