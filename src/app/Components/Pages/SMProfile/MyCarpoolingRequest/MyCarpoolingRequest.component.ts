import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';
import { RequestPost9ach } from 'src/app/models/modelS/RequestPost9ach';
import { Panier9ach } from 'src/app/models/modelS/panier9ach';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { CarpoolingRequest } from 'src/app/models/modelSM/CarpoolingRequest';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-my-commandes',
  templateUrl: './MyCarpoolingRequest.component.html',
  styleUrls: ['./MyCarpoolingRequest.component.css'],
})
export class MyCarpoolingRequest implements OnInit {
  carpoolingrequests: CarpoolingRequest[] = []; // Initialize as an empty array
  postsByPanier: { [key: number]: Post9ach[] } = {}; // Key-value pair for Post9ach by Panier ID

  constructor(private cs: CarpoolingService,private ecommerceService:EcommerceService) {}

  ngOnInit(): void {
    this.getRequestsByUserId();
    
  }

  getRequestsByUserId(): void {
    this.cs.getCarpoolingRequestsByUserId().subscribe(
      (data: CarpoolingRequest[]) => {
        this.carpoolingrequests = data;

       
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }
 
  
}
