import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-add-collocation',
  templateUrl: './add-collocation.component.html',
  styleUrls: ['./add-collocation.component.css']
})
export class AddCollocationComponent  implements OnInit {

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
    imageCollocation: []
  };
  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);


  constructor(private offerService: OfferService, private router: Router) { }
  model = {
    dateOffer: new Date(), 
  };
  ngOnInit(): void {
         this.setDateOfferToSystemDate();


  }

  setDateOfferToSystemDate() {
    this.model.dateOffer = new Date(); // This will set dateOffer to the current system date
  }

 
  saveOffer(): void {

    this.offerService.createCollocation(this.collocationOffer).subscribe(
      (createdOffer: CollocationOffer) => {
        console.log('Offer saved successfully:', createdOffer);
      },
      (error) => {
        console.error('Error saving offer:', error);
      }
    );
  }

  onSubmit(): void {

    this.saveOffer();
    this.goToOfferList();

  }
  goToOfferList() {
    this.router.navigate(['/Collocation/showOffer']);
  }

}
