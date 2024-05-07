import { Output,Component, OnInit, EventEmitter } from '@angular/core';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { RequestPost9ach } from 'src/app/models/modelS/RequestPost9ach';
import { CouponService } from 'src/app/services/serviceOns/coupon.service';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  //cartItems: Post9ach[] = [];
  code: string = '';
foloso: number=0;



  cartItems: { post: Post9ach; quantity: number }[] = [];
  totalPrice: number = 0;
  intervalId: any;
  @Output() activeSteps = new EventEmitter<number>();
  @Output() rj3 = new EventEmitter<number>();

  constructor(private ecommerceService: EcommerceService,private carpoolingservice: CarpoolingService ,private coupon: CouponService) {}

  isCartDialogVisible: boolean = true;

  discountCalculated: boolean = false;
  newTotal: number  = 0;;
  discount:number=0;

  calculateDiscount(): void {
    const total = this.calculateTotalPrice();
    this.coupon.calculateDiscount(this.code, this.totalPrice).subscribe(discount => {
      console.log('Discount received:', discount);
      this.discount = discount;
      this.newTotal = this.totalPrice - discount;
      this.discountCalculated = true;
    });
  }
  calculateTotalPriceons(): number {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.post.price!, 0);
    return this.totalPrice;
  }

  toggleCartDialog2(): void {
      this.isCartDialogVisible = !this.isCartDialogVisible;
      this.activeSteps.emit(1);
  }

  ngOnInit() {

    this.loadCartItems();

    this.intervalId = setInterval(() => {
      this.loadCartItems();
    }, 2000);
    
  }

  loadCartItems(): void {
    this.ecommerceService.getCartItems().subscribe({
      next: (cartItems) => {
        this.cartItems = cartItems;

        this.calculateTotalPrice();
      },
      error: (error) => {
        console.error(`Failed to load cart items: ${error.message}`);
      }
    });
  }

  removeItem(item: Post9ach): void {
    this.rj3.emit(item.idPost9ach);

    this.ecommerceService.removeFromCart(item).subscribe(
      () => {
       
        this.cartItems = this.cartItems.filter(cartItem => cartItem.post.idPost9ach !== item.idPost9ach);
             this.calculateTotalPrice();
      },
      (error) => {
        console.error(`Failed to remove item from cart: ${error.message}`);
      }
    );
  }

  clearCart(): void {

    for (const cartItem of this.cartItems) {
      this.rj3.emit(cartItem.post.idPost9ach);
  }
    this.ecommerceService.clearCart().subscribe(
      () => {
        this.cartItems = [];
        this.totalPrice = 0;
        console.log("Cart has been cleared.");
      },
      (error) => {
        console.error(`Failed to clear cart: ${error.message}`);
      }
    );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.post.price! * item.quantity, 0);
  }


  buyPanier(): void {
console.log("lpnier",this.cartItems)
for (const cartItem of this.cartItems) {

  this.ecommerceService.updatePostAndPoint(cartItem.post.idPost9ach!, cartItem.quantity).subscribe(
      () => {
          console.log(`Post and point updated successfully for post ID: ${cartItem.post.idPost9ach!}`);
          console.log(`Post and point updated successfully for post ID: ${cartItem.quantity}`);

      },
      (error) => {
          console.error(`Failed to update post and point for post ID: ${cartItem.post.idPost9ach!}:`, error);
      }
  );
}
const priceToUse = (this.newTotal === 0) ? this.totalPrice : this.newTotal;
this.carpoolingservice.getPointsByUser(1).subscribe(
  {  next: ( res : number)=>

    {
this.foloso=res;
console.log("floso",res)
    }
  }
)

    this.ecommerceService.buyPanier(priceToUse).subscribe({
        next: (response: RequestPost9ach) => {
            console.log("Purchase successful:", response);
            alert(` you have points, Payment successful! Total price: ${priceToUse}`);
            this.clearCart();
        },
        error: (error) => {
          
            console.error("Purchase error:", error);
        }
    });
}
}
