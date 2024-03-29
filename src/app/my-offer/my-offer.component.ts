import { Component, OnInit } from '@angular/core';
import { OfferService } from '../Services/Collocation/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from '../Model/Collocation/CollocationOffer';
import { RequestService } from '../Services/Collocation/request.service';
import { CollocationRequest, RequestEnum } from '../Model/Collocation/CollocationRequest';
import { RoomDetails } from '../Model/Collocation/RoomDetails'; 
import { saveAs } from 'file-saver-es';


@Component({
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.css']
})
export class MyOfferComponent implements OnInit {   
  id!: number;   
  collocationRequest: CollocationRequest = {
    idCollocationRequest: 0,
    request: RequestEnum.Pending, 
    date: new Date(), 
    places: 0,
    description: '',
    roomDetailsList: [] as RoomDetails[], 
    selectedDate: [] as Date[] 
  }; 
  collocationRequests: CollocationRequest[] = []; // Corrected type declaration

  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0,
    location: '',
    houseType: 0,
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: [] 
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
            
    this.offerService.getCollocationOfferById(this.id).subscribe(data => {
      this.collocationOffer = data; 
    }, error => console.log(error)); 
    this.requestService.getRequestsForOffer(this.id).subscribe(
      (data: CollocationRequest[]) => {
        this.collocationRequests = data;
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }   
  acceptRequest(idRequest: number): void {
    this.offerService.acceptCollocationRequest(this.id, idRequest)
      .subscribe(
        response => {
          console.log(response); 
          
        },
        error => {
          console.error(error);  
          window.location.reload();

        }
      ); 
      const contractData = this.generateContract(this.collocationRequest); 
      console.log(contractData)

      // Convert the contract data to a Blob
      const blob = new Blob([contractData], { type: 'application/pdf' });

      // Save the Blob as a file using FileSaver.js
      saveAs(blob, 'contract.pdf');

  }   

  refuseRequest(idRequest:number): void {
    this.offerService.refuseCollocationRequest(this.id,idRequest)
      .subscribe(
        response => {
          console.log(response);  
          window.location.reload() ; 
        },
        error => {
          console.error(error); 
          window.location.reload();

        }
      );
  } 
  generateContract(response: CollocationRequest): string {
    // Extract necessary information from the response to populate the contract
/*     const clientName: string = response.clientName;
 */    const startDate: Date = response.date;

    // Example of terms with placeholders for dynamic values
    const dynamicTerms = `
        1. Service Description:
        The service provider agrees to provide  with [description of service] starting from ${startDate}.

        2. Payment Terms:
         agrees to pay ${[this.collocationOffer.price]} for the service provided on a payment frequency basis.

        3. Termination:
        Either party may terminate this contract with a month written notice to the other party.

        4. Governing Law:
        This contract shall be governed by and construed in accordance with the laws of Collocation.

        
    `;

    // Construct the contract content by replacing the placeholder with dynamic values
    const contractContent = `
        Contract
        --------
        
        This contract is made between  and the service provider.
        
        Start Date: ${startDate}
        
        Terms:
        
    `;

    return contractContent;
}
  

isAcceptDisabled(request: CollocationRequest): boolean {
  // Check if request is already canceled or available places are 0
  return request.request === 'Canceled' || this.collocationOffer.availablePlaces === 0;
}

  constructor(
    private offerService: OfferService, 
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
}
