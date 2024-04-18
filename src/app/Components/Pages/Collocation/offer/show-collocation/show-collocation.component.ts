import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { FeedbackService } from 'src/app/Services/Collocation/feedback.service';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-show-collocation',
  templateUrl: './show-collocation.component.html',
  styleUrls: ['./show-collocation.component.css']
})
export class ShowCollocationComponent  implements OnInit{

  offers: CollocationOffer[] = []; 
  offer:CollocationOffer = {
    idCollocationOffer: 0,
    location: '',
    houseType: 0,
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE, 
    averageRating:0, 
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: []
  }; 

  constructor(private offerService: OfferService,private router: Router,private feedbackService:FeedbackService  ) { }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getCollocationOffers().subscribe(
      (data) => {
        this.offers = data; 

      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  } 
  roundAverageRating(averageRating:number): string {
    return averageRating.toFixed(1);
  }

 getStarArray(averageRating: number): number[] {
  const roundedRating = Math.round(averageRating);
  return new Array(roundedRating);
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
    this.router.navigate(['Collocation/showDetailsOffer', id]);
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
        this.offer = data;
      });
    this.offer.roomDetailsList
  }
}
