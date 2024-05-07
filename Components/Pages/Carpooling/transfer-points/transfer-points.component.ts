import { Component, OnInit } from '@angular/core';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-transfer-points',
  templateUrl: './transfer-points.component.html',
  styleUrls: ['./transfer-points.component.css']
})
export class TransferPointsComponent implements OnInit {
  paymentHandler: any = null;
  pcn: number = 0;
  constructor(private carpoolingService: CarpoolingService) {}

  ngOnInit() {
    this.invokeStripe();
  }

  Payment(amount: number) {
    console.log('1');
    switch(amount) {
      case 10:
        this.pcn = 10;
        break;
      case 15:
        this.pcn = 17;
        break;
      case 20:
        this.pcn = 35;
        break;
      case 30:
        this.pcn = 50;
        break;
      case 40:
        this.pcn = 70;
        break;
      case 60:
        this.pcn = 100;
        break;
      case 100:
        this.pcn = 130;
        break;
      case 150:
        this.pcn = 200;
        break;
 
      default:
        this.pcn = 0; 
    }
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51OzY0pFcX9hHWqkWSrLmBJnQdCjCJK3pTtHsNtDwwTWa5pQ5vUTOet6ddAONeKc1yR7YDb4gZ0rFyM92fuknPz1100g3LeOU7I',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log('stripe hahah');
        alert('you aded ' + this.pcn + ' points.');
       
        const userId = 1; 
  
        this.carpoolingService.updatePoint(userId, this.pcn).subscribe(
          () => {
            console.log('Points updated successfully');
       
          },
          (error) => {
            console.error('Failed to update points:', error);
           
          }
        );
      }
    });
    paymentHandler.open({
      name: 'saif',
      description: 'are u sur',
      amount: amount ,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
