// all-registration.component.ts

import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/Model/Registration/Registration';
import { ServiceRegistrationService } from 'src/app/services/Registration/service-registration.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-registration',
  templateUrl: './all-registration.component.html',
  styleUrls: ['./all-registration.component.css']
})
export class AllRegistrationComponent implements OnInit {
  registrations: Registration[] = []; 

  constructor(private router: Router,private registrationService: ServiceRegistrationService) { }


  ngOnInit(): void {
    this.getAllRegistrations(); 
  }

  getAllRegistrations() {
    this.registrationService.getAllRegistrations() 
      .subscribe(
        (registrations: Registration[]) => {
          this.registrations = registrations; 
        },
        (error: any) => {
          console.error("Error fetching registrations:", error); 
        }
      );
  }

  editRegistration(registration: Registration) {
    // Here you can navigate to the update page with the registration ID
    // Example: this.router.navigate(['/registrations', registration.id, 'update']);
    console.log('Edit Registration:', registration);
    this.router.navigate(['admin/registrations', registration.id, 'update']);

  }
  toggleChat(): void {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    }
  }
  
deleteRegistration(registrationId: number) {
  // Display a confirmation dialog using SweetAlert2
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this registration.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call your registration service to delete the registration
      this.registrationService.deleteRegistration(registrationId)
        .subscribe(
          () => {
            console.log('Registration deleted successfully.');
            // Display a success message using SweetAlert2
            Swal.fire(
              'Deleted!',
              'Registration has been deleted.',
              'success'
            );
            // Optionally, you can update the registrations list after deletion
            this.getAllRegistrations();
          },
          (error: any) => {
            console.error("Error deleting registration:", error);
            // Display an error message using SweetAlert2
            Swal.fire(
              'Error!',
              'Failed to delete registration.',
              'error'
            );
            // Handle error, display error message, etc.
          }
        );
    }
  });
  
}}