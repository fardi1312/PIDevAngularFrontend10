import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { CollocationPreferences, Interest, Pets } from 'src/app/Model/Collocation/CollocationPreferences';
import { RoomType } from 'src/app/Model/Collocation/RoomDetails';
import { PreferencesService } from 'src/app/Services/Collocation/preferences.service';

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
