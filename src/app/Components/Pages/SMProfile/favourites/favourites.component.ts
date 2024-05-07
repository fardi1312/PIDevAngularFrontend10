import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { latestForRent, pagination } from '../../../../shared/interface/property';
import { PropertyService } from '../../../../shared/services/property.service';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingRequest } from 'src/app/models/modelSM/CarpoolingRequest';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent {

  public themeLogo = 'assets/images/logo/2.png';
  public footerLogo = 'assets/images/logo/footer-logo.png';
  public bgImage = 'assets/images/inner-background.jpg';
  public title = 'Dashboard';
  public parent = 'Home';
  public child = 'Favourites';

  

  public theme_default3 = '#ff5c41';
  public theme_default4 = '#ff8c41';

 

  constructor( private carpoolingOfferService: CarpoolingService,private ecommerceService: EcommerceService  ) {
  }
  carpoolingOffers: CarpoolingOffer[] = [];
  requesterNamesMap: { [offerId: number]: string[] } = {};
  carpoolingRequestsMap: { [offerId: number]: CarpoolingRequest[] } = {}; // To store requests per offer
  fadit: { [offerId: number]: number[] } = {};
  ngOnInit() {

  this.getCarpoolingOffersByUserI();
  console.log("kk",this.carpoolingRequestsMap);
  console.log("kk22",this.fadit);

  }
  loadAllRequestsByOffer(offerId: number): void {
    this.carpoolingOfferService.getAllRequestsByOffer(offerId).subscribe(
        (requests: CarpoolingRequest[]) => {
            this.carpoolingRequestsMap[offerId] = requests;
            this.fadit[offerId] = []; // Initialize the array for the offerId
            requests.forEach((request) => {
              this.fadit[offerId].push(request.nbPlacesAller!); // Add nbplacesaller to the array for the offerId
            });        },
        (error) => {
            console.error(`Error fetching requests for offer ID ${offerId}:`, error);
        }
    );
}
  getCarpoolingOffersByUserI(){
    this.carpoolingOfferService.getCarpoolingOffersByUserId()
    .subscribe((offers: CarpoolingOffer[]) => {
        this.carpoolingOffers = offers;
        offers.forEach((offer) => {
          this.getRequesterNamesForOffer(offer.carpoolingOfferID!);
          this.loadAllRequestsByOffer(offer.carpoolingOfferID!);
        });
      
    });
  }

  getRequesterNamesForOffer(offerId: number) {
    this.carpoolingOfferService.getRequesterNames(offerId).subscribe({
      next: (names: string[]) => {
        this.requesterNamesMap[offerId] = names; // Store the names in the map
        console.error(` requester names for offer ${this.requesterNamesMap[offerId]} ${offerId}:`);

      },
      error: (error) => {
        console.error(`Error fetching requester names for offer ${this.requesterNamesMap[offerId]} ${offerId}:`, error);
      }
    });
  }

  removePost(idPost: number): void {
    this.carpoolingOfferService.removeCarrpooling(idPost).subscribe(
      () => {
        console.log(`Post with ID ${idPost} removed successfully.`);
        this.carpoolingOffers= this.carpoolingOffers.filter(post => post.carpoolingOfferID !== idPost);
      },
      (error) => {
        console.error(`Error removing post with ID ${idPost}:`, error);
      }
    );
  }
  
  editPost(idpost: number): void {
    // Add your edit post logic here
  }

}
