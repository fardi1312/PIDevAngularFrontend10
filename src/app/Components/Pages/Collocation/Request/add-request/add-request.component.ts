// add-request.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { CollocationRequest, RequestEnum } from 'src/app/Model/Collocation/CollocationRequest';
import { RoomDetails, RoomType } from 'src/app/Model/Collocation/RoomDetails';
import { OfferService } from 'src/app/Services/Collocation/offer.service';
import { RequestService } from 'src/app/Services/Collocation/request.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  collocationRequest: CollocationRequest = {
    idCollocationRequest: 0,
    request: RequestEnum.Pending,
    places: 0,
    description: '',
    roomDetailsList: [] as RoomDetails[] 
  };
  addRoomDetail(): void {
    if (this.collocationOffer.roomDetailsList.length < this.maxRoomsAllowed) {
      this.collocationOffer.roomDetailsList.push({
        idRoomDetails: 0, // or assign a valid id
        roomType: RoomType.SINGLE,
        availablePlaces: 0, // assign the correct value
        prix: 0, // assign the correct value
      });
    }
  } 
  maxRoomsAllowed: number = 0;
  updateMaxRoomsAllowed() {
    this.maxRoomsAllowed = this.collocationOffer.houseType;
    if (this.collocationOffer.roomDetailsList.length > this.maxRoomsAllowed) {
      this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.slice(0, this.maxRoomsAllowed);
    }
  }


  initializeRoomDetails(): void {
    this.collocationRequest.roomDetailsList = [];
  
    for (let i = 0; i < this.collocationRequest.places; i++) {
      this.collocationRequest.roomDetailsList.push({ 
        idRoomDetails:0,
        roomType: RoomType.SINGLE, 
        availablePlaces: 1,
        prix: 0
      });
    }
  }
  
  idOffer: number = 0;
  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    location: '',
    houseType: 0,
    availablePlaces: 0,
    dateOffer: new Date(),
    dateRent: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: []
  };

  constructor(
    private offerService: OfferService,
    private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idOffer = +params['idOffer'] || 0;  
      console.log(this.idOffer);
    });

    this.offerService.getCollocationOfferById(this.idOffer).subscribe(data => {
      this.collocationOffer = data;
    }, error => console.log(error)); 
    this.initializeRoomDetails();
  } 
  

  // Add a room to roomDetailsList based on the requested places
  
  saveRequest(): void {
    const selectedRooms = this.collocationOffer.roomDetailsList.filter(room => room.selected);
  
    this.collocationRequest.roomDetailsList = [];
  
    selectedRooms.forEach(room => {
      this.collocationRequest.roomDetailsList.push({
        idRoomDetails: room.idRoomDetails,
        roomType: room.roomType,
        availablePlaces: room.availablePlaces,
        prix: room.prix
      });
    });
  
    console.log('Room details selected for collocation request:', this.collocationRequest.roomDetailsList);
  
    this.requestService.createCollocationRequest(this.collocationOffer.idCollocationOffer, this.collocationRequest).subscribe(
      (createdRequest: CollocationRequest) => {
        console.log('Request with room details saved successfully', createdRequest);
      },
      (error) => {
        console.error('Error saving Request', error);
      }
    );
  }
  
  onSubmit(): void {
    // Update the roomDetailsList of the collocationRequest object
    const updatedRoomDetailsList = this.collocationRequest.roomDetailsList.map((roomDetail: RoomDetails) => ({
      idRoomDetails: roomDetail.idRoomDetails,
      availablePlaces: roomDetail.availablePlaces,
      roomType: roomDetail.roomType,
      prix: roomDetail.prix,
      selected: true // Ensure all rooms are selected before saving
    }));
  
    // Assign the updated roomDetailsList to collocationRequest
    this.collocationRequest.roomDetailsList = updatedRoomDetailsList;
  
    console.log('Before adding room details:', this.collocationRequest);
     this.saveRequest();
    this.goToOfferList();
  }
        
  goToRequestList(): void {
    this.router.navigate(['/Collocation/showRequest']);
  }

  goToOfferList() {
    this.router.navigate(['/Collocation/showOffer']); 
  }
}
