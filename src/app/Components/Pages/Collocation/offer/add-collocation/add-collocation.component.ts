import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { RoomDetails, RoomType } from 'src/app/Model/Collocation/RoomDetails';
import { OfferService } from 'src/app/Services/Collocation/offer.service';

@Component({
  selector: 'app-add-collocation',
  templateUrl: './add-collocation.component.html',
  styleUrls: ['./add-collocation.component.css']
})
export class AddCollocationComponent implements OnInit {
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
    imageCollocation: '',
    roomDetailsList: [] as RoomDetails[], // Initialize roomDetailsList as an array
  };

  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);

  model = {
    dateOffer: new Date(),
  };

  constructor(private offerService: OfferService, private router: Router) {}

  ngOnInit(): void {
    this.setDateOfferToSystemDate();
  }

  houseType: number = 1;

  setDateOfferToSystemDate() {
    this.model.dateOffer = new Date();
  }  
  maxRoomsAllowed: number = 0;

  updateMaxRoomsAllowed() {
    this.maxRoomsAllowed = this.collocationOffer.houseType;
    if (this.collocationOffer.roomDetailsList.length > this.maxRoomsAllowed) {
      this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.slice(0, this.maxRoomsAllowed);
    }
  }
  

  addRoomDetail(): void {
    this.collocationOffer.roomDetailsList.push({
      idRoomDetails: 0,
      roomType: RoomType.SINGLE,
      availablePlaces: 0,
      prix: 0,
    });
  }

  onSubmit(): void { 

    // Convert roomDetailsList to the correct format
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.map(
      (roomDetail: RoomDetails) => ({
        idRoomDetails: roomDetail.idRoomDetails,
        availablePlaces: roomDetail.availablePlaces,
        roomType: roomDetail.roomType,
        prix: roomDetail.prix, 
      }) 

    );

    // Call the service to create the collocation offer
    this.offerService.createCollocation(this.collocationOffer).subscribe(
      (createdOffer: CollocationOffer) => {
        console.log('Offer saved successfully:', createdOffer);
        this.goToOfferList();
      },
      (error) => {
        console.error('Error saving offer:', error);
      }
    );
  }
  errorMessage: string = '';

  

  goToOfferList(): void {
    this.router.navigate(['/Collocation/showOffer']);
  }

  handleFileInput(event: any): void { 
    console.log('hello handle file input');
    const file: File = event.target.files[0];

    if (file) { 
      console.log('converting ... ');  
      this.convertFileToBase64(file); 
    } 

  }

  convertFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.collocationOffer.imageCollocation = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
