import { Component } from '@angular/core';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
import { agencyAgent ,propertyDetailsData } from 'src/app/shared/interface/property';
//import { PropertyService } from 'src/app/shared/services/property.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss'],
})
export class AgentListComponent {
  public activeSteps: number=0;

  public themeLogo = 'assets/images/logo/2.png';
  public footerLogo = 'assets/images/logo/footer-logo.png';
  public bgImage = 'assets/images/inner-background.jpg';
  public title = 'Agent List';
  public parent = 'Home';
  public child = 'Agent List';

  public agentsData: agencyAgent[]=[];
  
  //public propertyData: propertyDetailsData=;

  public theme_default3 = '#ff5c41';
  public theme_default4 = '#ff8c41';

// Define agentsData here or initialize it with appropriate data

  constructor(private carpoolingService: CarpoolingService) { }

  getAllOffers2(): void {
    // Call the method to fetch offers
    this.carpoolingService.getAll().subscribe(
      (offers: CarpoolingOffer[]) => {
        // Handle the fetched offers
        console.log('Fetched offers:', offers);
        // You can pass the fetched offers to the child component if needed
      },
      (error) => {
        // Handle error
        console.error('Error fetching offers:', error);
      }
    );
  }
  onPreferencesUpdated(): void {
    // Implement the logic to handle the event here
    console.log('Preferences updated');
  }
  ngOnInit() {
    document.documentElement.style.setProperty('--theme-default', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default3', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default4', this.theme_default4);

    
/*
    this.propertyService.propertyDetailsData().subscribe((response) => {
      this.propertyData = response;
    });*/
  }

  ngOnDestroy(): void {
    document.documentElement.style.removeProperty('--theme-default');
    document.documentElement.style.removeProperty('--theme-default3');
    document.documentElement.style.removeProperty('--theme-default4');
  }

  public receiveChildData(step: number) {
    this.activeSteps = step;
  }
}
