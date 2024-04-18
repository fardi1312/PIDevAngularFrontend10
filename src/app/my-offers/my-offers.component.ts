import { Component } from '@angular/core';
import { CollocationOffer, FurnitureCollocation, Gender } from '../Model/Collocation/CollocationOffer';
import { OfferService } from '../Services/Collocation/offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent { 
  offers: CollocationOffer[] = []; 
  offer:CollocationOffer = { 
    averageRating:0, 
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
    imageCollocation: '',
    roomDetailsList: []
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
  this.router.navigate(['Collocation/updateOffer', id]);
}
offerDetails(id: number){
  this.router.navigate(['Collocation/myOffer', id]);
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


