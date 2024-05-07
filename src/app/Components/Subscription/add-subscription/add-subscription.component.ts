import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from 'src/app/services/Subscription/service-subscription.service';
import Swal from 'sweetalert2'

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
    // Check if any field is empty
    if (!this.subscriptionForm.value.name || !this.subscriptionForm.value.price || !this.subscriptionForm.value.type || !this.subscriptionForm.value.duration) {
      // Show alert if any field is empty
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }
  
    // Show confirmation alert
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this subscription?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed with submission
        if (this.subscriptionForm.valid) {
          this.subscriptionService.addSubscription(this.subscriptionForm.value)
            .subscribe(() => {
              // Subscription added successfully, show success message
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Subscription added successfully!',
              });
            }, error => {
              console.error('Error adding subscription:', error);
            });
        } else {
          // Form is invalid, mark all fields as touched to display validation errors
          this.subscriptionForm.markAllAsTouched();
        }
      }
    });
  }
  
}  