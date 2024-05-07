import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationPreferences } from 'src/app/models/Collocation/CollocationPreferences';
import { CollocationPreferencesService } from 'src/app/services/Collocation/preferences.service';

@Component({
  selector: 'app-show-preferences',
  templateUrl: './show-preferences.component.html',
  styleUrls: ['./show-preferences.component.css']
})
export class ShowPreferencesComponent {
  preferences: CollocationPreferences[] = [];
  constructor(    private preferencesService: CollocationPreferencesService,private router: Router) { }

  ngOnInit(): void {
    this.loadOffers();
  }
  loadOffers() {
    this.preferencesService.getAllPreferences().subscribe(
      (data) => {
        this.preferences = data;
      },
      (error) => {
        console.error('Error loading offers:', error);
      }
    );
  }
  

}
