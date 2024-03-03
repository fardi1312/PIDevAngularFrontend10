import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-show-details-collocatin',
  templateUrl: './show-details-collocatin.component.html',
  styleUrls: ['./show-details-collocatin.component.css']
})
export class ShowDetailsCollocatinComponent implements OnInit {


  id!: number;
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
    imageCollocation: [],
    roomDetailsList: []

  }
  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);
  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private router: Router) { }

              ngOnInit(): void {
               
            
                this.id = this.route.snapshot.params['id'];
            
                this.offerService.getCollocationOfferById(this.id).subscribe(data => {
                  this.collocationOffer = data;
                }, error => console.log(error));
              }
            
              onSubmit() {
                this.offerService.updateOffer(this.id, this.collocationOffer).subscribe(data => {
                }, error => console.log(error));
              }
      


}
