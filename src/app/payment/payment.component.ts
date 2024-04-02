import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var Stripe: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: any;
  card: any;
  cardErrors: string;
  paymentForm: FormGroup;
  showSuccessMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.cardErrors = '';
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.stripe = Stripe('pk_test_51O4QygB7yd8zfaNumUXDluikCYZYxle9Y17JiZPBHXZPpDG06i1D1B5wMKNEet3OBbZ13GOHC3LKiOpcc3IVzSD9009wtIbPmv');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  onSubmit(): void {
    this.stripe.createToken(this.card).then((result: any) => {
      if (result.error) {
        this.cardErrors = result.error.message;
      } else {
        const token = result.token.id;
        this.http.post<any>('sk_test_51O4QygB7yd8zfaNuCL9pBMPNzGwHX77eCipF8qlzjB41nn4rHKGe39AgDxCydptEuP4UcLZ1ej42t9C6rCiKMV8100m2KWM5Di', { token }).subscribe(
          response => {
            console.log(response); // Log the response from the backend
            this.showSuccessMessage = true; // Display success message
            setTimeout(() => {
              this.router.navigate(['/success']); // Redirect to success page after a delay
            }, 3000); // Redirect after 3 seconds (adjust as needed)
          },
          error => {
            console.error(error);
          }
        );
      }
    });
  }
}
