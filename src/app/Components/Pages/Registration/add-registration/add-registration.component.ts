import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/services/Subscription/service-subscription.service';
import { ServiceRegistrationService } from 'src/app/services/Registration/service-registration.service';
import { Subscription } from 'src/app/Model/Subscription/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from 'src/app/Model/Registration/Registration';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/Model/User/user';
import { AuthService } from 'src/app/services/User/AuthService';
import { UserService } from 'src/app/services/User/UserService';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.css']
})
export class AddRegistrationComponent implements OnInit {
  subscriptionId!: number;
  subscriptionDetails!: Subscription;
  showPaymentOptions = false;
  registrationSuccess = false;
  registrationError = false;
  paymentForm!: FormGroup;
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private registrationService: ServiceRegistrationService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subscriptionId = +params['subscriptionId'];
      this.getSubscriptionDetails();
      this.getCurrentUser(); // Call getCurrentUser method
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required]
    });
  }

  getSubscriptionDetails() {
    this.subscriptionService.getSubscriptionById(this.subscriptionId).subscribe(
      (data: Subscription) => {
        this.subscriptionDetails = data;
        this.showPaymentOptions = true;
      },
      (error) => {
        console.error('Error fetching subscription details:', error);
      }
    );
  }
  getCurrentUser() {
    this.userService.getAuthenticatedUser().subscribe( // Changed to authService
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching current user:', error);
      }
    );
  }
  onPay() {



    if (this.paymentForm.valid && this.user && this.subscriptionDetails) {
      const selectedPaymentMethod = this.paymentForm.get('paymentMethod')?.value;

      let redirectRoute: string;

      if (selectedPaymentMethod === 'card') {
        redirectRoute = 'user/registration/payment';
      } else if (selectedPaymentMethod === 'wallet') {
        redirectRoute = 'user/registration/wallet';
      } else {
        return;
      } 

      let endDate: Date | null = null;
      const subscriptionDuration = this.subscriptionDetails.duration.toLowerCase();
      const startDate = new Date();
  // Calculate end date based on subscription duration
  if (subscriptionDuration === 'one_month') {
    endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (subscriptionDuration === 'one_year') {
    endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
      const registrationData: Registration = {
        id: 0,
        user: this.user,
        subscription: this.subscriptionDetails,
        startDate: startDate,
        endDate: endDate,
        status: 'PENDING'
      };

      this.registrationService.addRegistration(registrationData).subscribe(
        (response) => {
          this.registrationSuccess = true;
          this.registrationError = false;

          this.snackBar.open('Registration successfully added', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });

          this.router.navigate([redirectRoute]);
        },
        (error) => {
          console.error('Error adding registration:', error);
          this.registrationError = true;
          this.registrationSuccess = false;
        }
      );
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }
}
