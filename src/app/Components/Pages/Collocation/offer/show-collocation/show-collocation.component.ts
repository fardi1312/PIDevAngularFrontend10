import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer } from 'src/app/Model/Collocation/CollocationOffer';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-show-collocation',
  templateUrl: './show-collocation.component.html',
  styleUrls: ['./show-collocation.component.css']
})
export class ShowCollocationComponent  implements OnInit{

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

}