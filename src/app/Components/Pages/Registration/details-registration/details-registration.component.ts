import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from 'src/app/Model/Registration/Registration';
import { ServiceRegistrationService } from 'src/app/Services/Registration/service-registration.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from 'src/app/Model/User/user';

@Component({
  selector: 'app-details-registration',
  templateUrl: './details-registration.component.html',
  styleUrls: ['./details-registration.component.css']
})
export class DetailsRegistrationComponent implements OnInit {
  registration: Registration | null = null;
  user: User | null = null; // Variable to store user details
  error: any = null; // Variable to store error message

  constructor(
    private route: ActivatedRoute,
    private registrationService: ServiceRegistrationService
  ) { }

  ngOnInit(): void {
    this.getRegistrationDetails();
  }

  getRegistrationDetails(): void {
    const idString = this.route.snapshot.paramMap.get('id');
const id = idString ? parseInt(idString, 10) : 0; // Assuming a default value of 0 if idString is null or undefined

    if (!isNaN(id)) {
      this.registrationService.getRegistrationById(id)
        .pipe(
          catchError(error => {
            this.error = error;
            return throwError(error);
          })
        )
        .subscribe(registration => {
          this.registration = registration;
          if (registration && registration.user) {
            this.getUserDetails(registration.user.idUser);
          }
        });
    }
  }

  getUserDetails(userId: number): void {
    this.registrationService.getUserById(userId)
      .pipe(
        catchError(error => {
          this.error = error;
          return throwError(error);
        })
      )
      .subscribe(user => {
        this.user = user;
      });
  }
}
