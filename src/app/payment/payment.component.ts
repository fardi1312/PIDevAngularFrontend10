import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  stripe!: Stripe;
  card!: StripeCardElement;
  cardErrors: string = '';
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router

  ) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvc: ['', Validators.required],
      postalCode: [''] // Make sure this matches the name in your template
    });
    
  }

  ngOnInit(): void {
    // Initialize Stripe
    loadStripe('pk_test_51P5eP8031s5yHYhke8QTATU3qYrXz2xQ28EDQ1vmPIfh3iav4zImaqfX0Y4hmPSl0mQLhR0WsNeeDQjQQ7L0HLed002ueGECXz').then(stripe => {
      this.stripe = stripe!;
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }).catch(error => {
      console.error('Error initializing Stripe:', error);
    });
  }
  async onSubmit(): Promise<void> {
    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      this.cardErrors = error.message || '';
    } else if (token) {
      console.log('Token:', token);
      // Handle token - send to server for payment processing
  
      // Display SweetAlert confirmation
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Thank you for your payment!',
      }).then(() => {
        // Redirect to another page after the alert is closed
        this.router.navigate(['/user/subscription/offers']);
      });
    } else {
      console.error('Token is undefined.');
    }
  }
  
  
}
