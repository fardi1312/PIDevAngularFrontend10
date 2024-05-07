import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';
import { RequestPost9ach } from 'src/app/models/modelS/RequestPost9ach';
import { Panier9ach } from 'src/app/models/modelS/panier9ach';
import { Post9ach } from 'src/app/models/modelS/Post9ach';

@Component({
  selector: 'app-my-commandes',
  templateUrl: './Mycommandes.component.html',
  styleUrls: ['./Mycommandes.component.css'],
})
export class Mycommandes implements OnInit {
  requests: RequestPost9ach[] = [];
  panier9ach: Panier9ach[] = []; // Initialize as an empty array
  postsByPanier: { [key: number]: Post9ach[] } = {}; // Key-value pair for Post9ach by Panier ID

  constructor(private ecommerceService: EcommerceService) {}

  ngOnInit(): void {
    this.getRequestsByUserId();
    this.findPanierById();
  }

  getRequestsByUserId(): void {
    this.ecommerceService.getRequestsByUserId().subscribe(
      (data: RequestPost9ach[]) => {
        this.requests = data;

       
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }

  findPanierById(): void {
    this.ecommerceService.findPanierById().subscribe(
      (data: Panier9ach[]) => {
        this.panier9ach=data;
        console.log('Found Panier9ach:', data);
        data.forEach(panier => {
          this.ecommerceService.findPostsByPanierId(panier.idPanier9ach!).subscribe(
            (posts: Post9ach[]) => {
              this.postsByPanier[panier.idPanier9ach!] = posts;
            },
            (error) => {
              console.error(`Error fetching posts for Panier ID ${panier.idPanier9ach!}:`, error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching Panier9ach:', error);
      }
    );

  }
}
