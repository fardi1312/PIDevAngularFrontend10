import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/UserService';

@Component({
  selector: 'app-show-photo-profile',
  templateUrl: './show-photo-profile.component.html',
  styleUrls: ['./show-photo-profile.component.css']
})
export class ShowPhotoProfileComponent implements OnInit {
  photoVisible: boolean = true; // Variable de statut pour contrôler la visibilité de la photo
  UrlImage: string | undefined = ''; // Variable pour stocker l'URL de l'image de profil, initialisée à une chaîne vide

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadProfilePhotoPath();
  }

  loadProfilePhotoPath(): void {
    this.userService.getProfilePhotoUrl().subscribe(
      (url: string) => {
        this.UrlImage = url; 
      },
      error => {
        console.error('Error fetching profile photo path:', error);
      }
    );
  }

  togglePhotoVisibility(): void {
    this.photoVisible = !this.photoVisible; // Inversion de la valeur de photoVisible
  }
}
