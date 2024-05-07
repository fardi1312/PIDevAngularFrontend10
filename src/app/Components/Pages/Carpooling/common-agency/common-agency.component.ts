import { Component, Input } from '@angular/core';
import { agencyAgent } from 'src/app/shared/interface/property';
import { Marker, marker, CircleMarker } from 'leaflet';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
import { CarpoolingRequest } from 'src/app/models/modelSM/CarpoolingRequest';
import { getLocaleDateFormat } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as L from 'leaflet';
@Component({
  selector: 'app-common-agency',
  templateUrl: './common-agency.component.html',
  styleUrls: ['./common-agency.component.scss'],
})
export class CommonAgencyComponent {
  @Input() as?:number=0;
  previousAs?: number ;
    applyFiltersInterval: any;
  searchOffersByTargetInterval: any;
  searchOffersByLocationInterval: any;
  markera: Marker<any> | null = null;
  private map: L.Map | undefined;
  private markers: L.Marker[] = [];
  @Input() carpoolingOffers: CarpoolingOffer[] = [];
  @Input() carpoolingRequest: CarpoolingRequest = {};
  @Input() agencyData: agencyAgent[]=[];
  @Input() type: string='';
  @Input() totalData: number=0;
  
  public searchType: string = 'Aller'; 
  public departureDate: Date=new Date();
  public returnDate: Date=new Date();
 // public filteredCarpoolingOffers: CarpoolingOffer[];
public location :   string='';

public isOpenFilter: boolean = false;
public isOpen: boolean = false;
public listView: boolean = false;
public active: boolean = false;
public listViewBox: boolean = false;
public col_lg_6: boolean = false;
public col_md_6: boolean = false;
public col_lg_4: boolean = false;
public col_xxl_3: boolean = false;
public col_6: boolean = false;
public col_xl_6: boolean = false;
public col_xl_4!: boolean

  searchParams = {
    location: '',
    availablePlaces: 0,
    Type: '',
    dateRent: new Date(),
    date: '',
    time:'',
    price: null
  };
  offers: CarpoolingOffer[] = [];
  filters = {
    Type: '',
    Furnitured: '',
    priceBelow500: false,
    price500to1000: false,
    price1000to1500: false,
    priceOver1500: false
  };
  filtersApplied = false;
  filteredOffers: CarpoolingOffer[] = []
latlng ?: L.LatLng;
llxx? : number;
llyy? : number;
  constructor(private route: ActivatedRoute,private offerService: CarpoolingService,private carpoolingService: CarpoolingService) { }
 

  

  searchResults: CarpoolingOffer[] = [];

  search() {
    console.log('Searching...');
    const { date, time, price } = this.searchParams;
  
    if (date || time || price !== null) {
        // Combine date and time strings into a single datetime string
        const datetimeString = `${date} ${time}:00.0`;
        
        // Call the service method with the combined datetime string and price
        console.log('aahh ', datetimeString)
        this.carpoolingService.findCarpoolingOffersByDateAndPrice(datetimeString, price!)
            .subscribe((offers: CarpoolingOffer[]) => {
                this.filteredOffers = offers;
                console.log('Filtered offers:', this.filteredOffers);
            });
    } else {
        console.error('Please provide at least one search parameter');
    }
}
 
  locateMe() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.llxx= position.coords.latitude,
        this.llyy= position.coords.longitude
        console.log('hawino',this.llxx)!
        this.map!.setView([this.llxx,this.llyy], 15); 
        if (this.markera) {
          this.map!.removeLayer(this.markera);
        }
        this.markera = L.marker([this.llxx,this.llyy]).addTo(this.map!).bindPopup("You are here");
      }, (error) => {
        console.error('Error getting location:', error);
        alert("Error getting your location. Please try again.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
         this.searchOffersByLocation();
  }

  initMap() {
 
    
    this.map = L.map('map').setView([36.8188, 10.166], 10); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
   

    this.showMarkersOnMap(); 
  
    this.map.on('click', (e) => {
    
      console.log('Clicked on the map:', e.latlng);

    this.latlng=e.latlng;
    if ( !this.map){

    }
    else{
    if (this.markera) {
      this.map.removeLayer(this.markera);
    }

    this.markera = marker(e.latlng).addTo(this.map);
  }
if (this.markera) {
          this.map!.removeLayer(this.markera);
        }
     this.searchOffersByTarget();
     const marker1 = L.marker([36.90304675980363, 10.19084930419922]).addTo(this.map!);
  
     for (const target of this.filteredOffers) {
       
     L.Routing.control({
       waypoints: [
         
 
         L.latLng(parseFloat(target.locationLx),parseFloat(target.locationLy)),
         L.latLng(36.90304675980363, 10.19084930419922),
         
       ],
     
     }).on('routesfound', (e) => {
       console.log('ons',e);
       e.routes[0].coordinates.forEach((c: L.LatLngLiteral, i: number) => {
     
     
         setTimeout(() => {
     
           marker1.setLatLng([c.lat, c.lng]);
         }, 1000 * i);
       });
     }).addTo(this.map!);
   }

   
    });
    
  }


  applyFilters() {
    console.log('Applied filters:', this.filters);
    this.filtersApplied = true;
    console.log('ddd', this.filteredOffers);
    clearInterval(this.applyFiltersInterval); 
    this.getAllOffers();
    this.filteredOffers = this.carpoolingOffers;
  
    this.filteredOffers = this.filteredOffers.filter(offer => {
      if (this.filters.Type && offer.carpoolingType !== this.filters.Type) {
        return false;
      }
  
      return true;
    });
  
    
  }
  
  searchOffersByLocation() {
   
    const radiusInMeters = 8000;
  
    const filteredOffers = this.carpoolingOffers.filter(offer => {
      const lat = parseFloat(offer.locationLx);
      const lng = parseFloat(offer.locationLy);
  
      const distance = this.calculateDistance(lat, lng, this.llxx!, this.llyy!);
      
      return distance <= radiusInMeters;
    });
  
    this.filteredOffers = filteredOffers;
    
    this.showMarkersOnMap();
  

  }
  
    searchOffersByTarget() {
    const radiusInMeters = 2000;
    const filteredOffers = this.carpoolingOffers.filter(offer => {
      if (!this.latlng) {
        console.error("latlng is undefined");
        return false;
      } else {
        let foundSuitableTarget = false;
  
        let i = 0;
        let zab = 0;
        while (i < offer.targets!.length && !foundSuitableTarget && zab == 0) {
          const target = offer.targets![i];
  
          const distance = this.calculateDistance(target.latitude!, target.longitude!, this.latlng.lat, this.latlng.lng);
  
          if (distance <= radiusInMeters) {
            foundSuitableTarget = true;
          }
  
          i++;
        }
  
        return foundSuitableTarget;
      }
    });
  
    this.filteredOffers = filteredOffers;
  
    this.showMarkersOnMap();
 
  }
  



 
  getAllOffers2(): void {
  
    this.carpoolingService.findMatchingOffers(1).subscribe(
      (offers: CarpoolingOffer[]) => {
        this.filteredOffers  = offers;
        
   
        console.log('salamo alikom',this.carpoolingOffers);
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
    this.applyFilters();
  }
  
 
  getAllOffers(): void {
    
    this.carpoolingService.getAll().subscribe(
      (offers: CarpoolingOffer[]) => {
        this.carpoolingOffers  = offers;
        console.log('bawazaaaaaaaaaa',this.carpoolingOffers);
      },
      (error) => {
        console.error('Error fetching offers:', error);
      }
    );
  }
  ngOnInit() {
/*
    this.route.paramMap.subscribe(params => {
      const offersParam = params.get('offers');
      if (offersParam) {
        this.offers = JSON.parse(offersParam);
        this.applyFilters(); 
       this.initMap(); 
      }
    });
    */
    setInterval(() => {
     
      if (this.as !== this.previousAs) {
        this.getAllOffers2();
      
        this.previousAs = this.as;
      }
    }, 5000);


    this.getAllOffers2();
 

   this.applyFilters();
   
   this.initMap();
 
      this.carpoolingService.listView = true;
      this.carpoolingService.col_lg_6 = true;
      this.carpoolingService.col_xl_6 = true;
      this.carpoolingService.col_md_6 = false;
    
  }
 
  ngOnDestroy() {
    this.carpoolingService.listView = false;
  

    this.carpoolingService.col_lg_6 = false;
    this.carpoolingService.col_md_6 = false;
    this.carpoolingService.col_lg_4 = false;
    this.carpoolingService.col_xxl_3 = false;
    this.carpoolingService.col_6 = false;
    this.carpoolingService.col_xl_6 = false;
  }

  ngDoCheck() {
    this.listView = this.carpoolingService.listView;
    this.col_lg_6 = this.carpoolingService.col_lg_6;
    this.col_md_6 = this.carpoolingService.col_md_6;
    this.col_lg_4 = this.carpoolingService.col_lg_4;
    this.col_xxl_3 = this.carpoolingService.col_xxl_3;
    this.col_6 = this.carpoolingService.col_6;
    this.col_xl_6 = this.carpoolingService.col_xl_6;
    this.col_xl_4 = this.carpoolingService.col_xl_4;
  }



  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; 
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; 
    return d * 1000; 
  }


  showMarkersOnMap() {
    if (this.map) {
      
      this.markers.forEach(marker => this.map?.removeLayer(marker));
      this.markers = [];
     
      this.filteredOffers.forEach(offer => {
        const locationLxNum = parseFloat(offer.locationLx);
        const locationLyNum = parseFloat(offer.locationLy);

        const orangeIcon = L.icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });


        const marker = L.marker([locationLxNum, locationLyNum], { icon: orangeIcon }).addTo(this.map!);
        marker.bindPopup(` ${offer.location} `).openPopup();
        this.markers.push(marker);
      });
      if (this.markers.length > 0) {
        const group = new L.FeatureGroup<any>(this.markers);
        this.map.fitBounds(group.getBounds());
      }
    }
  }
 
  onMapReady(map: L.Map) {
    this.map = map;
    this.showMarkersOnMap();
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // You can use a unique identifier of your item
  }
}
