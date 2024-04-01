import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { PreferencesService } from 'src/app/Services/Collocation/preferences.service';
import { Gender } from 'src/app/models/Collocation/CollocationOffer';
import { CollocationPreferences, Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';
import { RoomType } from 'src/app/models/Collocation/RoomDetails';

@Component({
  selector: 'app-update-preferences',
  templateUrl: './update-preferences.component.html',
  styleUrls: ['./update-preferences.component.css']
})
export class UpdatePreferencesComponent {
  constructor(
    private preferencesService: PreferencesService,
    private router: Router,
  ) {}
  petOptions: string[] = Object.values(Pets);
  genderOptions: string[] = Object.values(Gender);
  interestOptions: string[] = Object.values(Interest);
  roomTypeOptions: string[] = Object.values(RoomType);
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

  updatePreferences(id: number) {
    this.preferencesService.updatePreferences(id, this.collocationPreferences).subscribe(
      (data) => {
        console.log('Preference updated successfully:', data);
      },
      (error) => {
        console.error('Error updating preference:', error);
      }
    );
}


}
