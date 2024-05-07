import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceRegistrationService } from 'src/app/services/Registration/service-registration.service';
import { Registration } from 'src/app/Model/Registration/Registration';
import { SubscriptionService } from 'src/app/services/Subscription/service-subscription.service';
import { Subscription } from 'src/app/Model/Subscription/Subscription';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-registration',
  templateUrl: './update-registration.component.html',
  styleUrls: ['./update-registration.component.css']
})
export class UpdateRegistrationComponent implements OnInit {
  registrationId!: number;
  registration!: Registration;
  subscription!: Subscription; // Declare subscription property
  updateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private registrationService: ServiceRegistrationService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit(): void {
    this.registrationId = this.route.snapshot.params['id'];
    this.getRegistrationById(this.registrationId);
    this.initForm();
  }

  initForm(): void {
    this.updateForm = this.formBuilder.group({
      user: ['', Validators.required],
      subscription: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  getRegistrationById(id: number): void {
    this.registrationService.getRegistrationById(id)
      .subscribe(
        (registration: Registration) => {
          this.registration = registration;
          this.getSubscriptionById(registration.subscription.id);
          this.updateForm.patchValue({
            user: registration.user,
            subscription: registration.subscription.id,
            startDate: registration.startDate,
            endDate: registration.endDate,
            status: registration.status
          });
        },
        (error: any) => {
          console.error("Error fetching registration:", error);
        }
      );
  }
  
  getSubscriptionById(id: number): void {
    this.subscriptionService.getSubscriptionById(id)
      .subscribe(
        (subscription: Subscription) => {
          this.subscription = subscription; // Assign the fetched subscription to the subscription property
        },
        (error: any) => {
          console.error("Error fetching subscription:", error);
        }
      );
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to update the registration.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Create a new Registration object with updated values from the form
          const updatedRegistration: Registration = {
            id: this.registration.id,
            user: this.updateForm.value.user,
            subscription: this.subscription,
            startDate: this.updateForm.value.startDate,
            endDate: this.updateForm.value.endDate,
            status: this.updateForm.value.status
          };
      
          // Call the updateRegistration method from your service to update the registration
          this.registrationService.updateRegistration(this.registration.id, updatedRegistration)
            .subscribe(
              (updatedRegistration: Registration) => {
                console.log("Registration updated successfully:", updatedRegistration);
                Swal.fire(
                  'Updated!',
                  'Registration has been updated.',
                  'success'
                ).then(() => {
                  // Redirect to the All Registrations page
                  this.router.navigate(['/admin/registration/all']);
                });
                // Optionally, navigate to another page or display a success message
              },
              (error: any) => {
                console.error("Error updating registration:", error);
                Swal.fire(
                  'Error!',
                  'Failed to update registration.',
                  'error'
                );
                // Handle error, display error message, etc.
              }
            );
        }
      });
    } else {
      console.error("Form is invalid!");
      // Optionally, display validation errors to the user
    }
  }
}  