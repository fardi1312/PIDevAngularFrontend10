import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-show-back-office',
  templateUrl: './show-back-office.component.html',
  styleUrls: ['./show-back-office.component.css']
})
export class ShowBackOfficeComponent  implements OnInit{




  offers: CollocationOffer[] = [];

  constructor(private offerService: OfferService,private router: Router) { }

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
  


}

