import { Component, EventEmitter, Output, Input, AfterViewInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
//import { Input, OnInit } from '@angular/core';


//import 'leaflet-routing-machine';
import { isPlatformBrowser } from '@angular/common';
import { Marker, marker, CircleMarker } from 'leaflet';
import * as L from 'leaflet';
import axios from 'axios';
import { Coordinates } from 'src/app/models/modelSM/Coordinates';
@Component({
  
  selector: 'app-property-address-details',
  templateUrl: './property-address-details.component.html',
  styleUrls: ['./property-address-details.component.scss'],
})
export class PropertyAddressDetailsComponent {
  marker: Marker<any> | null = null;
  latlng ?: L.LatLng;
  markera: Marker<any> | null = null;
  private map: L.Map | undefined;
  private markers: L.Marker[] = [];
  @Input() activeCoo: CarpoolingOffer={ locationLx: '',
  locationLy: '',};
csaif:CarpoolingOffer={ locationLx: '',
locationLy: '',};
Crdn : Coordinates={};
@Output() activeCOO = new EventEmitter<CarpoolingOffer>();
  @Output() activeSteps = new EventEmitter<number>();
  @Output() activeIds = new EventEmitter<number>();
  public activeStep: number = 2;
  public validate: boolean = false;
  loc: string = ''; 
  delegation : string ='';
  code:number=0;
   
  lx: string='' ;
  ly: string='';

  public myForm = new FormGroup({
    address: new FormControl('', Validators.required),
    pin_code: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{4}$'),
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
   
    landmark: new FormControl('', Validators.required),
  });

  



  constructor( private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, private carpoolingService: CarpoolingService) { }
  initMap() {
    this.map = L.map('map').setView([36.8188, 10.166], 10); 
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  
    const defaultIcon = L.icon({
      iconUrl: "assetsaif/images/taxi.png",
      iconSize: [90, 90],
    });

  const marker1 = L.marker([36.90304675980363, 10.19084930419922], { icon: defaultIcon }).addTo(this.map);
    this.map.on('click', (e:any) => {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map!);
      L.Routing.control({
        waypoints: [
          L.latLng(e.latlng.lat, e.latlng.lng),
          L.latLng(36.90304675980363, 10.19084930419922),
          
        ],
      
      }).on('routesfound', (e:any) => {
        console.log('ons',e);
        e.routes[0].coordinates.forEach((c: L.LatLngLiteral, i: number) => {
          const crdn = { latitude: c.lat, longitude: c.lng };
         
      this.activeCoo.targets?.push(crdn);
          setTimeout(() => {
      
            marker1.setLatLng([c.lat, c.lng]);
          }, 1000 * i);
        });
      }).addTo(this.map!);
    });
    
   this.map.on('click', async (e: any) => {
    console.log("test11",e);
    const latlng = e.latlng;
    this.lx=latlng.lat;
    this.ly=latlng.lng;
    console.log(latlng);

    if (this.marker) {
      this.map!.removeLayer(this.marker);
    }

    this.marker = marker([latlng.lat, latlng.lng]).addTo(this.map!).bindPopup(`Latitude: ${latlng.lat}, Longitude: ${latlng.lng}`);

    const distance = this.calculateDistance(latlng.lat, latlng.lng, 36.6831962621516, 10.185699462890627);
      

        console.log('Distance to Bizerte:', distance, 'km');
      
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`);
      const address = response.data.address;
      const country = address.country;
      const state = address.state || address.province || address.county; 
      const codepost = address.postcode;
      const county = address.county;
      const sta = address.state_district;
       this.loc=county;
this.delegation=sta;
       this.code=codepost;
      console.log("ffff", address)
            
      console.log("Country:", sta);
    
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  });
    
  }
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}
locateMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map!.setView(latlng, 15); 
      if (this.marker) {
        this.map!.removeLayer(this.marker);
      }
      this.marker = L.marker(latlng).addTo(this.map!).bindPopup("You are here");
    }, (error) => {
      console.error('Error getting location:', error);
      alert("Error getting your location. Please try again.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}


deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}



rad2deg(rad: number) {
    return rad * (180 / Math.PI);
}
  ngOnInit():void {

    this.initMap();
  }
  previous() {
    const number = this.activeStep - 1;
    this.activeSteps.emit(number);
  }
  next(myForm: FormGroup,loc:string) {
 console.log('ffftaw',this.activeCoo)
   if (this.myForm.invalid) {
     this.validate = true;
   } else {

this.activeCoo.location=loc;
console.log(this.lx);
this.activeCoo.locationLx=this.lx;
this.activeCoo.locationLy=this.ly;
console.log('estcesu',this.activeCoo.carpoolingOfferID);
if(typeof this.activeCoo.carpoolingOfferID=="number"){
  console.log('maram');
    this.carpoolingService.updateOffer(this.activeCoo.carpoolingOfferID,this.activeCoo).subscribe(
      (uOf) => {
        console.log('New offer update:', uOf);
        this.activeCOO.emit(uOf);
      },
      (error) => {
        console.error('Error adding offer:', error);
      }

    )
    }
     const number = this.activeStep + 1;
     this.activeSteps.emit(number);
   }
  }
 
  
  get address() {
    return this.myForm.get('address');
  }


  get pin_code() {
    return this.myForm.get('pin_code');
  }

 

  get landmark() {
    return this.myForm.get('landmark');
  }
}
