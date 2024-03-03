import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { RoomDetails, RoomType } from 'src/app/Model/Collocation/RoomDetails';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-update-collocation',
  templateUrl: './update-collocation.component.html',
  styleUrls: ['./update-collocation.component.css']
})
export class UpdateCollocationComponent implements OnInit {


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
    imageCollocation: []
  }
  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);
  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private router: Router) { }
model = {
                dateOffer: new Date(), 
              };
           
            
              setDateOfferToSystemDate() {
                this.model.dateOffer = new Date(); // This will set dateOffer to the current system date
              }
            

  ngOnInit(): void {
    this.setDateOfferToSystemDate();

    this.id = this.route.snapshot.params['id'];

    this.offerService.getCollocationOfferById(this.id).subscribe(data => {
      this.collocationOffer = data;
    }, error => console.log(error));
  }
  onSubmit() {
    if (!Array.isArray(this.collocationOffer.roomDetailsList)) {
      console.error('RoomDetails is not an array');
      return;
    }
  
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.map((roomDetail: RoomDetails) => ({
      idRoomDetails: roomDetail.idRoomDetails,
      availablePlaces: roomDetail.availablePlaces,
      roomType: roomDetail.roomType,
      prix: roomDetail.prix,
      
    }));
  
    this.offerService.updateOffer(this.id,this.collocationOffer).subscribe
      (data => {
        this.goToOfferList();
      }, error => console.log(error));
    }


  goToOfferList() {
    this.router.navigate(['/Collocation/showOffer']);
  }
  addRoomDetail(): void {
    this.collocationOffer.roomDetailsList.push({
      idRoomDetails: 0, // or assign a valid id
      roomType: RoomType.SINGLE,
      availablePlaces: 0, // assign the correct value
      prix: 0, // assign the correct value
    });
  }

}
