import { Component } from '@angular/core';
import { EmailService } from '../Services/Email/email.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  selectedDate: string; // Property to store the selected date
  showSuccessMessage: boolean = false; // Flag to control the display of the success message

  constructor(private emailService: EmailService) {
    this.selectedDate = ''; // Initializing selectedDate
  }

  confirmDate() {
    // Implement the logic for what to do when the user confirms the date
    console.log('Date confirmed:', this.selectedDate);

    // You can add further logic here, such as submitting the selected date or any other action.

    // For demonstration purposes, sending email and setting a timeout to simulate an asynchronous operation
    this.sendEmail();
    setTimeout(() => {
      // Simulating a successful response from the backend
      console.log('Simulating success response from backend');
      this.showSuccessMessage = true; // Display success message
    }, 2000); // Simulating a delay of 2 seconds (adjust as needed)
    
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
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
  }
}
