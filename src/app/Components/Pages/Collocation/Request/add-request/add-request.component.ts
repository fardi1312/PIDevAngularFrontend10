import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationRequest, RequestEnum } from 'src/app/Model/Collocation/CollocationRequest';
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

  constructor(
    private requestService: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idOffer = +params['idOffer'] || 0;
    });
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
