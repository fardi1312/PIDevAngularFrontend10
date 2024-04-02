import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/Model/Registration/Registration';
import { ServiceRegistrationService } from 'src/app/Services/Registration/service-registration.service';

@Component({
  selector: 'app-all-registration',
  templateUrl: './all-registration.component.html',
  styleUrls: ['./all-registration.component.css']
})
export class AllRegistrationComponent implements OnInit {
  registrations: Registration[] = []; 

  constructor(private registrationService: ServiceRegistrationService) { }

  ngOnInit(): void {
    this.getAllRegistrations(); 
  }

  getAllRegistrations() {
    this.registrationService.getAllRegistrations() 
      .subscribe(
        (registrations: Registration[]) => {
          this.registrations = registrations; 
        },
        (error: any) => {
          console.error("Error fetching registrations:", error); 
        }
      );
  }
}
