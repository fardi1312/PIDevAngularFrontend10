import { Component, OnInit } from '@angular/core';
import { OfferService } from '../Services/Collocation/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationOffer, FurnitureCollocation, Gender } from '../Model/Collocation/CollocationOffer';
import { RequestService } from '../Services/Collocation/request.service';
import { CollocationRequest, RequestEnum } from '../Model/Collocation/CollocationRequest';
import { RoomDetails } from '../Model/Collocation/RoomDetails'; 

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
    selectedDate: [] as Date[],  
    roomPlaces:[] 
  }; 
  collocationRequests: CollocationRequest[] = []; 

  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0, 
    averageRating:0, 
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
  idUser:number=1;  

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
          const acceptedRequest = this.collocationRequests.find(request => request.idCollocationRequest === idRequest);
          if (acceptedRequest) {  
            window.location.reload(); 
            alert("please check your Calendar") ;  
          } 
        },
        error => {  

          window.location.reload(); 
          alert("please check your Calendar") ;  
          console.error(error);
          this.sendMail(idRequest);
 
        }
      );
  }
  
  sendMail(idRequest: number): void {
    this.offerService.sendMail(this.id, idRequest)
      .subscribe(
        response => {
          console.log('Email sent successfully', response);
          // Handle success response
        },
        error => {
          console.error('Failed to send email', error);
          // Handle error response
        }
      );
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
  
/*   generateContract(request: CollocationRequest, offer: CollocationOffer): string {
    // Check if request.date is a Date object before calling toDateString
    const startDate: string = request.date.toString();    
    const rentDate: string = offer.dateRent.toString();
    const priceToPay: number = offer.price; 
    const place: string = offer.location; 
    const roomDetails: RoomDetails[] = request.roomDetailsList; 
    const clientName: number = this.idUser;  
    const serviceDescription: string = offer.descriptionCollocation; 

    const contractContent = `
        Contract
        --------
        
        This contract is made between ${clientName} and the service provider.
        
        ON: ${startDate} 
        Rent Date: ${rentDate}
        Location: ${place}
        Price to Pay: ${priceToPay}
        Service Description: ${serviceDescription}  
        Room Details: ${JSON.stringify(roomDetails)} 

        Terms:
        - Service Description:
          The service provider agrees to provide ${serviceDescription} starting from ${startDate}.
        - Payment Terms:
          The client agrees to pay ${priceToPay} for the service provided on a payment frequency basis.
        - Termination:
          Either party may terminate this contract with a month written notice to the other party.
        - Governing Law:
          This contract shall be governed by and construed in accordance with the laws of Collocation. 




         Co&Co all rights are reserved
    `;

    return contractContent;
}
 */
  isAcceptDisabled(request: CollocationRequest): boolean {
    return request.request === 'Canceled' || this.collocationOffer.availablePlaces === 0;
  }

  constructor(
    private offerService: OfferService, 
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { } 


  }