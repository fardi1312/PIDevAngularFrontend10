import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationFedback } from 'src/app/models/Collocation/CollocationFeedback';
import { CollocationOffer , FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';
import { User } from 'src/app/models/Collocation/User';
import { FeedbackService } from 'src/app/services/Collocation/feedback.service';
import { OfferService } from 'src/app/services/Collocation/offer.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  collocationFeedback: CollocationFedback = {
    idCollocationFeedback: 0,
    feedbackDescription: '',
    rating: 0,
    feedbackDate: new Date()
  }; 
  selectedRating: number = 0;
  hoveredRating: number | null = null;
  stars: number[] = [1, 2, 3, 4, 5];

setRating(rating: number) {
  this.collocationFeedback.rating = rating;
}


  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    governorate: '',
    averageRating: 0,
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
        this.goToOfferList();
      },
      (error) => {
        console.error('Error saving offer:', error);
        this.goToOfferList();
      }
    );
  }

  onSubmit(): void {
    console.log('Submitting feedback...');
    this.saveFeedback();
  }

  goToOfferList(): void {
    this.router.navigate(['/Collocation/showOffer']);
  }
}
