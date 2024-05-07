// account-verification.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/UserService';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {
  selectedSubscription: string | null = null;
  isVerified!: boolean ;

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.isAccountVerified().subscribe(
      (isVerified: boolean) => {
        if (isVerified) {
          this.isVerified = true;
          console.log('Account is verified');     
            }
        if (!isVerified) {
       this.isVerified = false;    
      console.log('Account is not verified');
      }
      },
      (error) => {
        console.error('Error checking account verification:', error);
      }
    );
  
  }

  selectSubscription(subscriptionType: string): void {
    this.selectedSubscription = subscriptionType;
  }

  verifyAccount(): void {
    if (this.selectedSubscription) {
      this.userService.requestAccountVerification(this.selectedSubscription)
        .subscribe(() => {
          console.log('Demande de vérification du compte effectuée avec succès.');
        }, error => {
          console.error('Erreur lors de la demande de vérification du compte :', error);
        });
    } else {
      console.warn('Aucune option d\'abonnement sélectionnée.');
    }
  }
}
