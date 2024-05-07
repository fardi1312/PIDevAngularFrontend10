import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer } from 'src/app/Model/Collocation/CollocationOffer';
import { OfferService } from 'src/app/services/Collocation/offer.service';

@Component({
  selector: 'app-save-collocatin',
  templateUrl: './save-collocatin.component.html',
  styleUrls: ['./save-collocatin.component.css']
})
export class SaveCollocatinComponent {
  constructor(private offerService: OfferService,private router: Router) { }
  offers: CollocationOffer[] = [];

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getCollocationOffers().subscribe(
      (data) => {
        this.offers = data.filter(offer => offer.saved === true);
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  }
  
}
