import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CollocationOffer } from 'src/app/models/Collocation/CollocationOffer';
import { OfferService } from 'src/app/Services/Collocation/offer.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-search-collocation',
  templateUrl: './search-collocation.component.html',
  styleUrls: ['./search-collocation.component.css']
})
export class SearchCollocationComponent implements OnInit {
  private map: L.Map | undefined;
  private markers: L.Marker[] = [];

  offers: CollocationOffer[] = [];
  filtersApplied = false;
  filteredOffers: CollocationOffer[] = [];

  searchTerm: string = '';

  searchParams = {
    governorate: '',
    availablePlaces: 0,
    houseType: 0,
    dateRent: new Date()
  };

  filters = {
    houseType: '',
    Furnitured: '',
    priceBelow500: false,
    price500to1000: false,
    price1000to1500: false,
    priceOver1500: false
  };

  constructor(private route: ActivatedRoute, private offerService: OfferService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const offersParam = params.get('offers');
      if (offersParam) {
        this.offers = JSON.parse(offersParam);
        this.applyFilters(); // Apply filters after receiving search results
        this.initMap(); // Initialize the map with markers
      }
    });
  }

  initMap() {
    this.map = L.map('map').setView([36.8188, 10.166], 10); // Set the initial view of the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.showMarkersOnMap(); // Show markers on the map

    // Add click event to the map
    this.map.on('click', (e) => {
      console.log('Clicked on the map:', e.latlng);
      this.searchOffersByLocation(e.latlng);
    });
    

  }

  search(): void {
    const governorate = this.searchParams.governorate || '';
    const houseType = this.searchParams.houseType || 0;
    const availablePlaces = this.searchParams.availablePlaces || 0;
    const dateRent = this.searchParams.dateRent || new Date();
  
    this.offerService.searchOffers(governorate, houseType, availablePlaces, dateRent)
      .subscribe(
        (offers: CollocationOffer[]) => {
          console.log('Offers:', offers);
          this.offers = offers;
          this.applyFilters(); 
          this.showMarkersOnMap();
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
  }
  


  applyFilters() {
    console.log('Applied filters:', this.filters);
    this.filtersApplied = true;

    this.filteredOffers = this.offers.filter(offer => {
      if (this.filters.houseType && offer.houseType !== parseInt(this.filters.houseType, 10)) {
        return false;
      }
      if (this.filters.Furnitured && offer.furnitureCollocation !== this.filters.Furnitured) {
        return false;
      }
      if (this.filters.priceBelow500 && offer.price >= 500) {
        return false;
      }
      if (this.filters.price500to1000 && (offer.price < 500 || offer.price >= 1000)) {
        return false;
      }
      if (this.filters.price1000to1500 && (offer.price < 1000 || offer.price >= 1500)) {
        return false;
      }
      return true;
    });

    this.showMarkersOnMap(); // Update markers on the map based on the filtered offers
  }

  searchOffersByLocation(latlng: L.LatLng) {
    const radiusInMeters = 5000; 
    const filteredOffers = this.offers.filter(offer => {
      const distance = latlng.distanceTo(L.latLng(parseFloat(offer.locationLy), parseFloat(offer.locationLx)));
      return distance <= radiusInMeters;
    });
    this.filteredOffers = filteredOffers;
    this.showMarkersOnMap(); 
  }
  




onMapReady(map: L.Map) {
  this.map = map;
  this.showMarkersOnMap();
}
showMarkersOnMap() {
  if (this.map) {
    // Clear existing markers
    this.markers.forEach(marker => this.map?.removeLayer(marker));
    this.markers = [];
    // Add new markers for each filtered offer
    this.filteredOffers.forEach(offer => {
      const locationLxNum = parseFloat(offer.locationLx);
      const locationLyNum = parseFloat(offer.locationLy);

      const marker = L.marker([locationLyNum, locationLxNum]).addTo(this.map!);
      marker.bindPopup(`<b>Price: ${offer.price} dt</b><br>`).openPopup();
      this.markers.push(marker);
    });

    // Fit the map bounds to all markers
    if (this.markers.length > 0) {
      const group = new L.FeatureGroup<any>(this.markers);
      this.map.fitBounds(group.getBounds());
    }
  }
}






}