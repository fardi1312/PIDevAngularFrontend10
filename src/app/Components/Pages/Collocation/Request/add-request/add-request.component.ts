import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from 'src/app/Model/Collocation/CollocationOffer';
import { CollocationRequest, RequestEnum } from 'src/app/Model/Collocation/CollocationRequest';
import { OfferService } from 'src/app/Services/Collocation/offer.service';
import { RequestService } from 'src/app/Services/Collocation/request.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  collocationRequest: CollocationRequest = {
    idCollocationRequest: 0,
    request: RequestEnum.Pending, 
    places: 0,
    description: ''
  };

  idOffer: number = 0;
  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    location: '',
    houseType: 0,
    availablePlaces: 0, 
    dateOffer:new Date(),
    dateRent: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: []
  };

  constructor(
    private offerService: OfferService,
    private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idOffer = +params['idOffer'] || 0;
    });

    this.offerService.getCollocationOfferById(this.idOffer).subscribe(data => {
      this.collocationOffer = data;
    }, error => console.log(error));
  }

  saveRequest(): void {
    this.requestService.createCollocationRequest(this.idOffer, this.collocationRequest).subscribe(
      (createdRequest: CollocationRequest) => {
        console.log('Request saved successfully:', createdRequest);
        this.goToOfferList();
      },
      (error) => {
        console.error('Error saving request:', error);
      }
    );
  }

  onSubmit(): void {
    this.saveRequest();
  }

  goToRequestList(): void {
    this.router.navigate(['/Collocation/showRequest']);
  } 

  goToOfferList() {
    this.router.navigate(['/Collocation/showOffer']);
  }
}
