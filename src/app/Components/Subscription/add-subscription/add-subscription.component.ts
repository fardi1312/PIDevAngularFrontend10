import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from 'src/app/Services/Subscription/service-subscription.service';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }
  addSubscription(): void {
    if (confirm('Are you sure you want to add this subscription?')) {
      if (this.subscriptionForm.valid) {
        this.subscriptionService.addSubscription(this.subscriptionForm.value)
          .subscribe(() => {
            // Subscription added successfully, you can redirect or show a success message
            console.log('Subscription added successfully');
          }, error => {
            console.error('Error adding subscription:', error);
          });
      } else {
        // Form is invalid, mark all fields as touched to display validation errors
        this.subscriptionForm.markAllAsTouched();
      }
    }
 
}
}