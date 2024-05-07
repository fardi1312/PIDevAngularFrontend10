import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Settings } from '../Model/settings/settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings[] = [];
  newSetting: Settings = { id: 0, commissionRate: 0, transactionType: '' };
  transactionTypes: string[] = ['collocation', 'carpooling', 'fourniture', 'events']; // Define transactionTypes

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings() {
    this.settingsService.getAllSettings().subscribe(
      (data: Settings[]) => {
        this.settings = data;
      },
      error => {
        console.log('Error fetching settings:', error);
      }
    );
  }

  addSetting() {
    // Validate commission rate
    if (this.newSetting.commissionRate === null || isNaN(this.newSetting.commissionRate)) {
      console.log('Invalid commission rate');
      return;
    }

    this.settingsService.addSetting(this.newSetting).subscribe(
      (data: Settings) => {
        this.settings.push(data);
        this.newSetting = { id: 0, commissionRate: 0, transactionType: '' }; // Clear the form
      },
      error => {
        console.log('Error adding setting:', error);
      }
    );
  }

  deleteSetting(id: number) {
    this.settingsService.deleteSetting(id).subscribe(
      () => {
        this.settings = this.settings.filter(setting => setting.id !== id);
      },
      error => {
        console.log('Error deleting setting:', error);
      }
    );
  }
}
