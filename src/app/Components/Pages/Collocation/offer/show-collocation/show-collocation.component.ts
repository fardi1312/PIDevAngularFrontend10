import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';
import { OfferService } from 'src/app/Services/Collocation/offer.service';
import { Filter } from 'src/app/models/Collocation/Filter';




@Component({
  selector: 'app-show-collocation',
  templateUrl: './show-collocation.component.html',
  styleUrls: ['./show-collocation.component.css']
})
export class ShowCollocationComponent  implements OnInit{
  filtersApplied = false;
  isOfferSaved: boolean = false;
  searchParams = {
    governorate: '',
    availablePlaces: 0,
    houseType: 0,
    dateRent:new Date
  
  };
  matchingOffers: CollocationOffer[] = [];

  
  
  filters = {
    houseType: '',
    Furnitured:'',
    priceBelow500: false,
  price500to1000: false,
  price1000to1500: false,
  priceOver1500: false

  };

  offers: CollocationOffer[] = [];
  filteredOffers: CollocationOffer[] = [];


  constructor(private offerService: OfferService,private router: Router) { }
  savedOfferIds: number[] = [];
  ngOnInit(): void {
    this.loadOffers();
   // this.watchPosition();

  }

  
  
  
  


  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
  
  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  
  

  
  
  deleteOffer(id: number){
    if (confirm("Are you sure you want to delete this offer?")) {
      this.offerService.deleteCollocationOffer(id).subscribe(data => {
        console.log(data);
        this.loadOffers();
      });
    }
  }
  search(): void {
    this.offerService.searchOffers(this.searchParams.governorate, this.searchParams.houseType, this.searchParams.availablePlaces, this.searchParams.dateRent)
      .subscribe(
        (offers: CollocationOffer[]) => {
          console.log('Offers:', offers);
          this.router.navigate(['user/Collocation/SearchCollocation', { offers: JSON.stringify(offers) }]);

        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  allOffers!: CollocationOffer[]; // Déclarez cette variable en haut de votre composant

  loadOffers(): void {
    this.offerService.getCollocationOffers().subscribe(
      (data) => {
        this.allOffers = data; 
        let matchingOfferIds: number[] = [];
  
        this.offerService.getMatchingOffersForUser(1).subscribe(
          (matchingOffers: CollocationOffer[]) => {
            matchingOfferIds = matchingOffers.map(offer => offer.idCollocationOffer);
            console.log('Matching offer ids:', matchingOfferIds);
  
            this.matchingOffers = this.allOffers.filter(offer => matchingOfferIds.includes(offer.idCollocationOffer));
  
            this.applyFilters();
  
          },
          (error) => {
            console.error('Error loading matching offers:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  }
  
  applyFilters(): void {
    console.log('Applied filters:', this.filters);
  
    let filteredOffers = this.allOffers; // Utilisez allOffers comme base pour les filtres
  
    if (this.filters.houseType !== null && this.filters.houseType !== '') {
      filteredOffers = filteredOffers.filter(offer => offer.houseType === parseInt(this.filters.houseType, 10));
    }
    if (this.filters.Furnitured !== null && this.filters.Furnitured !== '') {
      filteredOffers = filteredOffers.filter(offer => offer.furnitureCollocation === this.filters.Furnitured);
    }
    if (this.filters.priceBelow500) {
      filteredOffers = filteredOffers.filter(offer => offer.price < 500);
    }
    if (this.filters.price500to1000) {
      filteredOffers = filteredOffers.filter(offer => offer.price >= 500 && offer.price < 1000);
    }
    if (this.filters.price1000to1500) {
      filteredOffers = filteredOffers.filter(offer => offer.price >= 1000 && offer.price < 1500);
    }
  
    // Apply filters on matching offers
    this.matchingOffers = this.matchingOffers.filter(offer => {
      if (this.filters.houseType !== null && this.filters.houseType !== '') {
        return offer.houseType === parseInt(this.filters.houseType, 10);
      }
      if (this.filters.Furnitured !== null && this.filters.Furnitured !== '') {
        return offer.furnitureCollocation === this.filters.Furnitured;
      }
      if (this.filters.priceBelow500) {
        return offer.price < 500;
      }
      if (this.filters.price500to1000) {
        return offer.price >= 500 && offer.price < 1000;
      }
      if (this.filters.price1000to1500) {
        return offer.price >= 1000 && offer.price < 1500;
      }
      return true;
    });
  
    // Filter offers including matching offers
    this.filteredOffers = filteredOffers.filter(offer => !this.matchingOffers.includes(offer));
  }
  
  
  
  
  
  
  
  

  
  
  

  watchPosition(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
          console.log('location',position);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0
        }
      );
    });
  }
  
  



  
  
  
  
  
  
  
  


  
updateOffer(id: number){
  this.router.navigate(['user/Collocation/updateOffer', id]);
}
offerDetails(id: number){
  this.router.navigate(['user/Collocation/showDetailsOffer', id]);
} 
addFeedback(id: number): void { 

  this.router.navigate(['user/Collocation/addFeedback',id ]);
} 
addRequest(id:number) : void 
{ 
  this.router.navigate(['user/Collocation/addRequest',id ]);

}



toggleSaveOffer(offerId: number) {
  this.offerService.toggleOfferSavedStatus(offerId).subscribe(
    () => {
      console.log('Offer saved or unsaved successfully');
      // Update your UI or any other logic here
    },
    (error) => {
      console.error('Error saving or unsaving offer:', error);
    }
  );
}









}