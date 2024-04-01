import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PreferencesService } from 'src/app/Services/Collocation/preferences.service';
import { CollocationPreferences } from 'src/app/models/Collocation/CollocationPreferences';

@Component({
  selector: 'app-show-preferences',
  templateUrl: './show-preferences.component.html',
  styleUrls: ['./show-preferences.component.css']
})
export class ShowPreferencesComponent {
  preferences: CollocationPreferences[] = [];
  constructor(    private preferencesService: PreferencesService,private router: Router) { }

  ngOnInit(): void {
    this.loadOffers();
  }
  loadOffers() {
    this.preferencesService.getCollocationPreferences().subscribe(
      (data) => {
        this.preferences = data;
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  }
  

}
