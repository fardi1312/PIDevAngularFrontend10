import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { CollocationPreferences, Interest, Pets } from 'src/app/Model/Collocation/CollocationPreferences';
import { RoomType } from 'src/app/Model/Collocation/RoomDetails';
import { PreferencesService } from 'src/app/Services/Collocation/preferences.service';

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css']
})
export class AddPreferencesComponent {
  preferences: CollocationPreferences[] = [];


  collocationPreferences: CollocationPreferences = {
    idCollocationPreferences: 0,
    pets: Pets.No,
    smoking: false,
    budget: 0,
    gender: Gender.MALE,
    interest: Interest.OTHER,
    roomType: RoomType.SINGLE,
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
  ngOnInit(): void {
    this.loadPreferences();
  }
  loadPreferences() {
    this.preferencesService.getCollocationPreferences().subscribe(
      (data) => {
        this.preferences = data;
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  }

  
  onSubmit(): void {
    this.savePreferences();  
    console.log("saved"); 
  }
  deletePrefernce(id: number){
    this.preferencesService.deleteCollocationPreferences(id).subscribe( data => {
        console.log(data);
        this.loadPreferences();
    })
} 


updatePrefernce(id: number){
  this.router.navigate(['Preferences/update', id]);
}

}