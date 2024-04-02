import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { CollocationPreferences, Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';
import { RoomType } from 'src/app/models/Collocation/RoomDetails';
import { CollocationPreferencesService } from 'src/app/Services/Collocation/preferences.service';

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css']
})
export class AddPreferencesComponent {
  preferences: CollocationPreferences[] = [];
  userId = 1; 


  collocationPreferences: CollocationPreferences = {
    idCollocationPreferences: 0,
    pets:Pets.No,
    smoking: false,
    budget: 0,
    gender: Gender.MALE,
    interest: Interest.No,
    roomType: RoomType.SINGLE,
    houseType: 0,
    location: '',
    furnitureCollocation: FurnitureCollocation.Furnitured,

    user: undefined as any 

  };

  petOptions: string[] = Object.values(Pets);
  genderOptions: string[] = Object.values(Gender);
  interestOptions: string[] = Object.values(Interest);
  roomTypeOptions: string[] = Object.values(RoomType);





  constructor(
    private preferencesService: CollocationPreferencesService,
    private router: Router,
  ) {}
 

  savePreferences(): void { 
    this.preferencesService.savePreferences(this.collocationPreferences, CollocationPreferencesService.userId).subscribe(
      (createdPreferences: CollocationPreferences) => {  
        console.log('Preferences saved successfully:', createdPreferences);
      },
      (error) => {
        console.error('Error saving preferences:', error); 
      }
    );
  }
  ngOnInit(): void {
   this.loadPreferencesByUserId(); 
  }
  loadPreferencesByUserId(): void {
    this.preferencesService.getPreferencesByUserId(this.userId).subscribe(
      (data) => {
        this.preferences = data;
      },
      (error) => {
        console.error('Error loading preferences:', error);
      }
    );
  }



  
  onSubmit(): void {
    this.savePreferences();  
this.loadPreferencesByUserId();
    console.log("saved"); 
  }
  deletePreference(id: number){
    if (confirm("Are you sure you want to delete this preference?")) {
      this.preferencesService.deletePreferences(id).subscribe( data => {
          console.log(data);
          this.loadPreferencesByUserId();
      });
    }
}



updatePrefernce(id: number){
  this.router.navigate(['Preferences/update', id]);
}
}
