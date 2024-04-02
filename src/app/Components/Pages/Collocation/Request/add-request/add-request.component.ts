// add-request.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';

import { OfferService } from 'src/app/Services/Collocation/offer.service';
import { RequestService } from 'src/app/Services/Collocation/request.service';
import {  CollocationOffer, FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { CollocationRequest, RequestEnum } from 'src/app/models/Collocation/CollocationRequest';
import { RoomDetails, RoomType } from 'src/app/models/Collocation/RoomDetails';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
}) 

export class AddRequestComponent implements OnInit { 
  dateRange: any; // Define dateRange property to store selected date range

  collocationRequest: CollocationRequest = { 
    roomPlaces:[], 
    idCollocationRequest: 0, 
    date:new Date(),
    request: RequestEnum.Pending,
    places: 0,
    description: '',
    roomDetailsList: [] as RoomDetails[] , 
    selectedDate: [] as Date[] // Declare it as an array of Date objects
  }; 
idUser= 1 ;  
  addRoomDetail(): void {
    if (this.collocationOffer.roomDetailsList.length < this.maxRoomsAllowed) {
      this.collocationOffer.roomDetailsList.push({
        idRoomDetails: 0, // or assign a valid id
        roomType: RoomType.SINGLE,
        availablePlaces: 0, // assign the correct value
        prix: 0, // assign the correct value
        selected:true

      });
    }
  }  
  change(event: any) {
    console.log('Selected date or range:', this.collocationRequest.selectedDate);
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
        prix: 0,
        selected:true
      });
    }
  }
  
  idOffer: number = 0;
  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    locationLx: '',
    locationLy: '',
    houseType: 0,
    saved:false,
    governorate: '',
    country: '',
    city: '',
    streetAddress: '',
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: [],
    smokingAllowed: false,
    petsAllowed: Pets.No,
    interest:Interest.No,
    matchPercentage:0,
    user: undefined as any 


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
  
  onDateRangeChange(event: any) {
    // Update selectedDate array with the start and end dates of the selected range
    this.collocationRequest.selectedDate = [new Date(event.start), new Date(event.end)];
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
        prix: room.prix,
        selected: true
      });
    });
  
    console.log('Room details selected for collocation request:', this.collocationRequest.roomDetailsList); 
    const updatedRoomDetailsList = this.collocationRequest.roomDetailsList.map((roomDetail: RoomDetails) => ({
      idRoomDetails: roomDetail.idRoomDetails,
      availablePlaces: roomDetail.availablePlaces,
      roomType: roomDetail.roomType,
      prix: roomDetail.prix,
      selected: true 
    }));
  
    this.collocationRequest.roomDetailsList = updatedRoomDetailsList;

  
    this.requestService.createCollocationRequest(this.collocationOffer.idCollocationOffer,this.idUser, this.collocationRequest).subscribe(
      (createdRequest: CollocationRequest) => {
        console.log('Request with room details saved successfully', createdRequest);
      },
      (error) => {
        console.error('Error saving Request', error);
      }
    );
  }
  
  onSubmit(): void {  
     this.saveRequest();
    this.goToOfferList();
  }
        
  goToRequestList(): void {
    this.router.navigate(['user/Collocation/showRequest']);
  }

  goToOfferList() {
    this.router.navigate(['user/Collocation/showOffer']); 
  }
}
