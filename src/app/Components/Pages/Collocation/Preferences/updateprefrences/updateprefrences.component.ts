import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { FurnitureCollocation, Gender } from 'src/app/models/Collocation/CollocationOffer';
import { CollocationPreferences, Interest, Pets } from 'src/app/models/Collocation/CollocationPreferences';
import { RoomType } from 'src/app/models/Collocation/RoomDetails';
import { CollocationPreferencesService } from 'src/app/services/Collocation/preferences.service';

@Component({
  selector: 'app-updateprefrences',
  templateUrl: './updateprefrences.component.html',
  styleUrls: ['./updateprefrences.component.css']
})
export class UpdateprefrencesComponent {
  constructor(
    private preferencesService: CollocationPreferencesService,
    private router: Router,              private route: ActivatedRoute,

  ) {}
  id: number = 0;

  petOptions: string[] = Object.values(Pets);
  genderOptions: string[] = Object.values(Gender);
  interestOptions: string[] = Object.values(Interest);
  roomTypeOptions: string[] = Object.values(RoomType);
 
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
    furnitureCollocation: FurnitureCollocation.Non,

    user: undefined as any }


  
  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.preferencesService.getPreferencesById(this.id).subscribe(data => {
      this.collocationPreferences = data;
    }, error => console.log(error));
  }

  updatePreferences(id: number) {
    this.preferencesService.updatePreferences(id, this.collocationPreferences).subscribe(
      (data) => {
        console.log('Preference updated successfully:', data);
        this.goToOfferList() 
      },
      (error) => {
        console.error('Error updating preference:', error);
      }
    );
}
goToOfferList() {
  this.router.navigate(['user/Collocation/addPreferences']);
}


}
