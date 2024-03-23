import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationPreferences, Gender, Interest, Pets, RoomType } from 'src/app/Model/Collocation/CollocationPreferences';
import { PreferencesService } from 'src/app/Services/Collocation/preferences.service'; 



@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css']
})

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css']
})
export class AddPreferencesComponent { 
  collocationPreferences: CollocationPreferences = {
    idCollocationPreferences: 0,
    pets: Pets.No,
    smoking: false,
    budget: 0,
    gender: Gender.Male,
    interest: Interest.ART,
    roomType: RoomType.Single,
    houseType: 0,
    location: ''
  };

  petOptions: string[] = Object.values(Pets);
  genderOptions: string[] = Object.values(Gender);
  interestOptions: string[] = Object.values(Interest);
  roomTypeOptions: string[] = Object.values(RoomType);




  idPreferences: number = 0;

  constructor(
    private preferencesService: PreferencesService,
    private router: Router,
  ) {}

  ngOnInit(): void { 
  }

  savePreferences(): void { 
    this.preferencesService.createCollocationPreferences(this.collocationPreferences).subscribe(
      (createdPreferences: CollocationPreferences) => {  
        console.log('Preferences saved successfully:', createdPreferences);
      },
      (error) => {
        console.error('Error saving preferences:', error); 
      }
    );
  }
  
  onSubmit(): void {
    this.savePreferences();  
    console.log("saved"); 
    this.goToPreferencesList(); 
  }

  goToPreferencesList(): void {
  }
}