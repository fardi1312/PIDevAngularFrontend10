import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationFedback } from 'src/app/Model/Collocation/CollocationFeedback';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { FeedbackService } from 'src/app/Services/Collocation/feedback.service';  
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit { 
  collocationFeedback: CollocationFedback = {
    idCollocationFeedback: 0,
    feedbackDescription: '',
    rating: 0 , 
    feedbackDate: new Date()
  };

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
    imageCollocation: ''
  };

  idOffer: number = 0;

  constructor(
    private offerService: OfferService,
    private offerFeedback: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      this.idOffer = +params['idOffer'] || 0;
      console.log('idOffer:', this.idOffer);

      this.offerService.getCollocationOfferById(this.idOffer).subscribe(data => {
        this.collocationOffer = data;
      });
    });
  }

  saveFeedback(): void { 
    this.offerFeedback.createCollocationFeedback(this.collocationFeedback, this.idOffer).subscribe(
      (createdOffer: CollocationFedback) => {  
        console.log('Offer saved successfully:', createdOffer);
        this.goToOfferList();  // Navigate here after successful save
      },
      (error) => {
        console.error('Error saving offer:', error); 
        this.goToOfferList();  // Navigate here after successful save
      }
    );
  }
  
  onSubmit(): void {
    console.log("ahla");
    this.saveFeedback();  
    console.log("saved");
    this.goToOfferList();
  }

  goToOfferList(): void {
    this.router.navigate(['/Collocation/showOffer']);
  }
}
