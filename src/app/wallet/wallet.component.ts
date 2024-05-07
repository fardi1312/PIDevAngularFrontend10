import { Component } from '@angular/core';
import { EmailService } from '../services/Email/email.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  selectedDate: string; // Property to store the selected date
  showSuccessMessage: boolean = false; // Flag to control the display of the success message

  constructor(private emailService: EmailService, private router: Router) {
    this.selectedDate = ''; // Initializing selectedDate
  }


  confirmDate() {
    // Display a confirmation dialog using SweetAlert2
    Swal.fire({
      title: 'Confirm Date',
      text: 'Are you sure you want to confirm this date?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement the logic for what to do when the user confirms the date
        console.log('Date confirmed:', this.selectedDate);
        Swal.fire({
          title: 'Confirmation',
          text: 'Thank you! We will send you an email for confirmation.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // You can add further logic here, such as submitting the selected date or any other action.
  
        // For demonstration purposes, sending email and setting a timeout to simulate an asynchronous operation
        this.sendEmail();
        setTimeout(() => {
          // Simulating a successful response from the backend
          console.log('Simulating success response from backend');
          this.showSuccessMessage = true; // Display success message
  
          // Redirect to the desired route
          this.router.navigate(['/user/subscription/offers']);
        }, 2000); // Simulating a delay of 2 seconds (adjust as needed)
      }
    });
  }

  sendEmail() {
    const toAddress = 'amira.ayari@esprit.tn'; // Change this to the recipient's email address
    const subject = 'Payment Confirmation'; // Change this to the desired email subject
    const body = `Thank you for confirming your payment on ${this.selectedDate}.`; // Customize the email body as needed
    console.log('Sending email to:', toAddress); // Log the email address
  
    // Assuming your email service has a method called sendEmail() which takes the recipient address, subject, and body
    this.emailService.sendEmail(toAddress, subject, body).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        // Check the response and handle it accordingly
      },
      (error) => {
        console.error('Error sending email:', error);
        // Handle the error, such as displaying an error message to the user
      }
    );
  }
  
}
