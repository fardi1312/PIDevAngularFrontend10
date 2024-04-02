

import { Component, OnInit, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Marker, marker, LeafletMouseEvent, LeafletEvent, circleMarker, CircleMarker } from 'leaflet';

import { Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { RoomDetails, RoomType } from 'src/app/models/Collocation/RoomDetails';
import { OfferService } from 'src/app/Services/Collocation/offer.service';
import * as L from 'leaflet';
import { Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';


@Component({
  selector: 'app-add-collocation',
  templateUrl: './add-collocation.component.html',
  styleUrls: ['./add-collocation.component.css']
})
export class AddCollocationComponent  implements OnInit {

  marker: Marker<any> | null = null;
  circleMarker: CircleMarker<any> | null = null;
  private map: L.Map | undefined;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object,private offerService: OfferService, private router: Router) {}

  uploadedImage: File | null = null;



  Initmap(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(leaflet => {
        const map = leaflet.map(this.elementRef.nativeElement.querySelector('#map')).setView([36.7, 10], 13);

        leaflet.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', (e: any) => {
          console.log(`LatLng: ${e.latlng.lat}, ${e.latlng.lng}`);
          if (this.marker) {
            map.removeLayer(this.marker);
          }
          this.collocationOffer.locationLx = e.latlng.lng;
          this.collocationOffer.locationLy = e.latlng.lat;
          this.marker = leaflet.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
            .bindPopup(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
          this.getAddressFromCoords(e.latlng.lat, e.latlng.lng).then((address) => {
            this.collocationOffer.governorate = address.state || '';
            this.collocationOffer.country = address.country || '';
            this.collocationOffer.city = address.city || '';
            this.collocationOffer.streetAddress = address.road || '';
            console.log(`Country: ${address.country}, Governorate: ${address.state}, City: ${address.city}, Street: ${address.road}, lx: ${e.latlng.lat}, ly: ${e.latlng.lng}`);
          });
        });
        
        
        

        map.on('dblclick', (e: any) => {
          if (this.circleMarker) {
            map.removeLayer(this.circleMarker);
          }
          this.circleMarker = leaflet.circleMarker([e.latlng.lat, e.latlng.lng], {
            color: 'red',
            weight: 4,
            radius: 150
          }).addTo(map);
        });

        map.on('contextmenu', (e: any) => {
          console.log(e);
        });
      }).catch(error => {
        console.error('Error loading Leaflet', error);
      });
      //this.watchPosition();
    }
  }

  async getAddressFromCoords(latitude: number, longitude: number): Promise<any> {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
    const data = await response.json();
    return {
        country: data.address?.country,
        state: data.address?.state,
        city: data.address?.city,
        road: data.address?.road
    };
  }
  


  userId = 1; 

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

  collocationId: number = 0; 


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

  
  maxRoomsAllowed: number = 0;

  
  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);
  interestOptions=Object.values(Interest);
  petOptions: string[] = Object.values(Pets);
  model = {
    dateOffer: new Date(), 
  };
  ngOnInit(): void {
         this.setDateOfferToSystemDate();
         this.Initmap();
       
  }

  houseType: number = 1;

  showMap = false;




  setDateOfferToSystemDate() {
    this.model.dateOffer = new Date(); 
  }

  errorMessage: string = '';

  onSubmit() {
    if (!this.isDateRentValid()) {
      this.errorMessage = 'Date of Rent must be superior to the system date.';
      return;
    }
  
    if (!Array.isArray(this.collocationOffer.roomDetailsList)) {
      this.errorMessage = 'RoomDetails is not an array';
      return;
    }
  
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.map((roomDetail: RoomDetails) => ({
      idRoomDetails: roomDetail.idRoomDetails,
      availablePlaces: roomDetail.availablePlaces,
      roomType: roomDetail.roomType,
      prix: roomDetail.prix,
      selected:true

    }));
  

    this.offerService.createCollocation(this.collocationOffer,this.userId).subscribe(
      (createdOffer: CollocationOffer) => {
        console.log('Offer saved successfully:', createdOffer);
       // this.collocationId = createdOffer.idCollocationOffer; // Assuming competitionID is the id you want to set

        this.goToOfferList();

        
      },
      (error) => {
        console.error('Error saving offer:', error);
        this.errorMessage = 'Error saving offer';
      }
    );
  }

// TypeScript
/* updateRooms() {
  const selectedHouseType = parseInt(this.collocationOffer.houseType, 10);
  const roomsToAdd = selectedHouseType - this.collocationOffer.roomDetailsList.length;

  if (roomsToAdd > 0) {
    for (let i = 0; i < roomsToAdd; i++) {
      this.collocationOffer.roomDetailsList.push({
        roomType: RoomType.Single, // Set default room type here
        availablePlaces: 1, // Set default available places here
        prix: 0 
      });
    }
  } else if (roomsToAdd < 0) {
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.slice(0, selectedHouseType);
  }
}
 */
  
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
        prix: 0, // Set default price here
        selected:true

      });
    }
  } else if (selectedHouseType < currentRoomsCount) {
    this.collocationOffer.roomDetailsList = this.collocationOffer.roomDetailsList.slice(0, selectedHouseType);
  }
}





  goToOfferList() {
    this.router.navigate(['user/Collocation/showOffer']);
  }
  isDateRentValid(): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(this.collocationOffer.dateRent);
  
    return selectedDate > currentDate;
  }
 
  onFileSelected(event: any) {
    this.uploadedImage = event.target.files[0];
  }
  uploadCompetitionImage() {
    if (this.uploadedImage) {
      this.offerService.uploadCollocationImage(this.collocationId, this.uploadedImage).subscribe(
        (data) => {
          console.log("Collocation Image Uploaded:", data);
          alert("Collocation Image Uploaded Successfully");
          window.location.reload();
        },
        (error) => {
          console.error("Error uploading collocation image:", error);
        }
      );
    } else {
      alert("Please select an image to upload.");
    }
  }
 
  
  
  
  

}
