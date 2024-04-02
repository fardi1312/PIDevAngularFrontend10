import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';
import { RoomDetails, RoomType } from 'src/app/models/Collocation/RoomDetails';
import { OfferService } from 'src/app/Services/Collocation/offer.service';
import { RoomDetailssService } from 'src/app/Services/Collocation/room-details.service';

@Component({
  selector: 'app-update-collocation',
  templateUrl: './update-collocation.component.html',
  styleUrls: ['./update-collocation.component.css']
})
export class UpdateCollocationComponent implements OnInit {


  id!: number;
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
    roomDetailsList: [],
    descriptionCollocation: '',
    imageCollocation: '',
    smokingAllowed: false,
    petsAllowed: Pets.No,
    interest:Interest.No,
    matchPercentage:0,
    user: undefined as any 


  }
  
  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);
  interestOptions=Object.values(Interest);
  petOptions: string[] = Object.values(Pets);
  showMap=false;
  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private router: Router,private roomService:RoomDetailssService) { }
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
    if (!this.isDateRentValid()) {
      this.errorMessage = 'Date of Rent must be superior to the system date.';
      return;
    }
    if (!Array.isArray(this.collocationOffer.roomDetailsList)) {
      console.error('RoomDetails is not an array');
      return;
    }
  
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.map((roomDetail: RoomDetails) => ({
      idRoomDetails: roomDetail.idRoomDetails,
      availablePlaces: roomDetail.availablePlaces,
      roomType: roomDetail.roomType,
      prix: roomDetail.prix,
      selected:true


      
    }));
  
    this.offerService.updateOffer(this.id,this.collocationOffer).subscribe
      (data => {
        this.goToOfferList();
      }, error => console.log(error));
    }
    maxRoomsAllowed: number = 0;

    updateMaxRoomsAllowed() {
      this.maxRoomsAllowed = this.collocationOffer.houseType;
      if (this.collocationOffer.roomDetailsList.length > this.maxRoomsAllowed) {
        this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.slice(0, this.maxRoomsAllowed);
      }
    }
    errorMessage: string = '';


  goToOfferList() {
    this.router.navigate(['user/Collocation/showOffer']);
  }
  addRoomDetail(): void {
    this.collocationOffer.roomDetailsList.push({
      idRoomDetails: 0, // or assign a valid id
      roomType: RoomType.SINGLE,
      availablePlaces: 0, // assign the correct value
      prix: 0, // assign the correct value
      selected:true

    });
  }
  isDateRentValid(): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(this.collocationOffer.dateRent);
  
    return selectedDate > currentDate;
  }
  deleteRoom(id: number){
    if (confirm("Are you sure you want to delete this offer?")) {
      this.roomService.deleteRoomDetailss(id).subscribe(data => {
        this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.filter(room => room.idRoomDetails !== id);

      });
    }
  }
  updateRooms() {
    const selectedHouseType = this.collocationOffer.houseType;
    const currentRoomsCount = this.collocationOffer.roomDetailsList.length;
  
    if (selectedHouseType > currentRoomsCount) {
      const roomsToAdd = selectedHouseType - currentRoomsCount;
      for (let i = 0; i < roomsToAdd; i++) {
        this.collocationOffer.roomDetailsList.push({
          idRoomDetails: 0, // You can set a default or autogenerated ID here
          roomType: RoomType.SINGLE, // Set default room type here
          availablePlaces: 1, // Set default available places here
          prix: 0 ,// Set default price here
          selected:true

        });
      }
    } else if (selectedHouseType < currentRoomsCount) {
      this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.slice(0, selectedHouseType);
    }
  }
  

  convertFileToBase64(file: File): void { 
    console.log('ahla'); 

    const reader = new FileReader(); 
    console.log('ahla'); 

    reader.onloadend = () => {
      this.collocationOffer.imageCollocation = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  handleFileInput(event: any): void { 
    const file: File = event.target.files[0];

    if (file) { 
      console.log('ahla'); 

      this.convertFileToBase64(file);
    }
  }

}
