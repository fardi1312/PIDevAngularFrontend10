import { Component } from '@angular/core';
import { Promotion } from 'src/app/models/modelOns/Promotion';
import { CouponService } from 'src/app/services/serviceOns/coupon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private promotionService: CouponService) { }
  promotions: Promotion[] = [];


showModal:boolean=false;
ngOnInit1() {
  const fifteenMinutesInMillis = 15 * 60 * 1000; // 15 minutes in milliseconds

  setInterval(() => {
    this.showModal = true;

    setTimeout(() => {
      this.showModal = false;
    }, 3000); // 3000 milliseconds (3 seconds)
  }, fifteenMinutesInMillis);
}

close(){
  this.showModal=false;
}




ngOnInit(): void {
  //this.AvailablePromotion();
}

AvailablePromotion(): void {
  this.promotionService.getAllPromotionsValable().subscribe(promotions => {
    this.promotions = promotions;
    if (this.promotions.length > 0) {
      this.showModal = true;
      
    }
  });
}



}
