import { Component } from '@angular/core';
import { Promotion } from 'src/app/models/modelOns/Promotion';
import { CouponService } from 'src/app/services/serviceOns/coupon.service';

@Component({
  selector: 'app-coupon-back',
  templateUrl: './coupon-back.component.html',
  styleUrls: ['./coupon-back.component.css']
})
export class CouponBackComponent {
  constructor(private promotionService: CouponService) { }
  promotions: Promotion[] = [];
modalAdd:Boolean=false;
collection = Array.from({ length: 100 }).map((_, index) => `Item ${index + 1}`);
p: number = 1;

coupon: Promotion = { idPromotion:0,code: '', discountPercentage: 0, expirationDate: new Date(), carpoolingRequestList: [] ,expire:true};

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.promotionService.getAllPromotions().subscribe(promotions => {
      this.promotions = promotions;
    });
  }
  OpenAdd(){
this.modalAdd=true;
}
closeModal(){

  this.modalAdd=false;
}




saveCoupon(): void {

  this.promotionService.addPromotion(this.coupon).subscribe(() => {
     this.loadPromotions();
    this.modalAdd = false; 
  });
}

delte(questionId: number): void {
  console.log('Deleting question...');
  if (window.confirm('Are you sure you want to delete this question?')) {
    this.promotionService.deletePromotion(questionId).subscribe(() => {
      // Remove the question from the local array
      this.promotions = this.promotions.filter(question => question.idPromotion!== questionId);
    });
  }
}
}
