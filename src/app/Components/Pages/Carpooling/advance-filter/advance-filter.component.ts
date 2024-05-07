


import { Component, EventEmitter, Input, Output } from '@angular/core';
//import { Options } from 'ngx-slider-v2';
import { agencyParams, areaFilter, bathParams, bedParams, categoryParams, img, priceFilter, roomsParams, statusParams } from '../../../../shared/interface/property';

import { CarpoolingPreferences } from 'src/app/models/modelSM/CarpoolingPreferenes';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
@Component({
  selector: 'app-advance-filter',
  templateUrl: './advance-filter.component.html',
  styleUrls: ['./advance-filter.component.scss'],
})

export class AdvanceFilterComponent {
  
  @Output() activeSteps = new EventEmitter<number>();
  public activeStep: number = 1;
  carpoolingPreferences: CarpoolingPreferences = {};
 floors?: number ;
  getlocation : String='' ;
nbplaces? : number;
carpoolingtype:String='';
chaufage:boolean = false;
climatise:boolean =false;
radionopen:boolean=false;
smoking :boolean=false;
desc:String='';
  
constructor(private carpoolingService: CarpoolingService) { }
  userId: number = 1; 
  @Output() preferencesUpdated: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit(): void {}

  updatePreferences(): void {
    const number = this.activeStep + 1;
    this.activeSteps.emit(number);

    console.log('kife', this.carpoolingPreferences);
    this.carpoolingService.updateCarpoolingPreferences(this.userId, this.carpoolingPreferences).subscribe(
      (updatedPreferences) => {
        console.log('kifeeeeeeeech', this.carpoolingPreferences);
        console.log('Preferences updated:', updatedPreferences);
        this.preferencesUpdated.emit();
      },
      (error) => {
        console.error('Error updating preferences:', error);
      }
    );
  }
 
/*  addPreferces(userId: number, budget: number, getlocation :String, nbplaces : number,carpoolingType:String ,chaufage : boolean,radionopen : boolean,smoking : boolean,climatise : boolean,desc:String): void {
    this.carpoolingPreferences.budget = budget;
    this.carpoolingPreferences.nbPlaces=nbplaces;
    this.carpoolingPreferences.carpoolingType= carpoolingType;
    this.carpoolingPreferences.chauffage=chaufage;
    this.carpoolingPreferences.climatise=climatise;
 
    this.carpoolingPreferences.smoking=smoking;
    

  this.carpoolingPreferences.radioon=radionopen;
 // this.preferencesUpdated.emit();

  if ( typeof getlocation== "string" && typeof desc=="string"){
    this.carpoolingPreferences.description="rFA";
    this.carpoolingPreferences.description=desc;
    this.carpoolingPreferences.location = getlocation;
  }
    console.log('chofage:', chaufage); 
    console.log('Floors:', this.floors);
    console.log('Carpoling Preferences:', this.carpoolingPreferences);
    this.carpoolingService.addPrefernces(userId, this.carpoolingPreferences).subscribe(
      (addedReq) => {
        console.log('New Preference added:', addedReq);
      },
      (error) => {
        console.error('Error adding Preference:', error);
      }
    );
  }*/
}