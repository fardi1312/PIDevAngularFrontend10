import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { OfferService } from 'src/app/services/Collocation/offer.service';
import * as L from 'leaflet';
import { Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';

@Component({
  selector: 'app-show-details-collocatin',
  templateUrl: './show-details-collocatin.component.html',
  styleUrls: ['./show-details-collocatin.component.css']
})
export class ShowDetailsCollocatinComponent implements OnInit {
  id!: number;
  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    locationLx: '',
    locationLy: '',
    governorate: '',
    country: '',
    saved: false,
    city: '',
    streetAddress: '',
    houseType: 0,
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
    interest: Interest.No,
    matchPercentage: 0,
    user: undefined as any,
    averageRating: 0
  };

  furnitureOptions = Object.values(FurnitureCollocation);
  genderOptions = Object.values(Gender);
  map!: L.Map;

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.offerService.getCollocationOfferById(this.id).subscribe(data => {
      this.collocationOffer = data;

      // Convert locationLx and locationLy to numbers
      const locationLxNum = parseFloat(this.collocationOffer.locationLx);
      const locationLyNum = parseFloat(this.collocationOffer.locationLy);

      this.map = L.map('map-detail').setView([locationLyNum, locationLxNum], 13);

      L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([locationLyNum, locationLxNum]).addTo(this.map)
        .bindPopup('Collocation Location').openPopup();
    }, error => {
      console.log(error);
    });
  }

  fetchImages(): void {
   
      this.offerService.getImageUrl(this.collocationOffer.idCollocationOffer).subscribe(
        (imageUrl: string) => {
          this.collocationOffer.imageCollocation = imageUrl;
          
        },
        (error) => {
          console.error("Error fetching  image:", error);
        }
      );
  
  }
  
}
 