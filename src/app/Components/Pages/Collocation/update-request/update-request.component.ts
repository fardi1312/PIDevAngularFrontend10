// update-request.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationRequest, RequestEnum  } from 'src/app/models/Collocation/CollocationRequest'; 
import { RequestService } from 'src/app/services/Collocation/request.service';

@Component({
  selector: 'app-update-request',
  templateUrl: './update-request.component.html',
  styleUrls: ['./update-request.component.css']
})
export class UpdateRequestComponent implements OnInit {
  idRequest: number = 0;
  collocationRequest: CollocationRequest = { 
    idCollocationRequest: 0, 
    date: new Date(), 
    request: RequestEnum.Pending,
    places: 0,
    description: '',  
    roomPlaces :[], 
    roomDetailsList:[], 
    selectedDate: [] as Date[] // Declare it as an array of Date objects
 
  };

  constructor(
    private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idRequest = +params['idRequest'] || 0;

      this.requestService.getCollocationRequestById(this.idRequest).subscribe(data => {
        this.collocationRequest = data;
      });
    });
  }

  saveRequest(): void {
    this.requestService.updateRequest(this.idRequest, this.collocationRequest).subscribe(
      (updatedRequest: CollocationRequest) => {
        console.log('Request updated successfully:', updatedRequest);
        this.goToRequestList();
      },
      (error) => {
        console.error('Error updating request:', error);
      }
    );
  }

  onSubmit(): void {
    this.saveRequest();
  }

  goToRequestList(): void {
    this.router.navigate(['/Collocation/showRequest']);
  }
}
