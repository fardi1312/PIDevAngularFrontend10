import { Component } from '@angular/core';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';



@Component({
  selector: 'app-acceuil-post',
  templateUrl: './acceuil-post.component.html',
  styleUrls: ['./acceuil-post.component.css'],
})
export class AcceuilPostComponent {

  posts: any[] = [];

  constructor(private carpoolingService: CarpoolingService,private router: Router,private el:ElementRef) {}

  ngOnInit(): void {
    this.loadAccueil();
  }

  loadAccueil(): void {
    this.carpoolingService.getAllAccueil().subscribe(posts => {
      this.posts = posts;

    });
  }


  onClick(event: MouseEvent) {
    const cardElement = event.currentTarget as HTMLElement;
    const cardTitleElement = cardElement.querySelector('.card-body h3') as HTMLElement;
    if (cardTitleElement) {
        const cardTitle = cardTitleElement.innerText.trim().toLowerCase();
        console.log('Clicked card title:', cardTitle);


        if (cardTitle) {
          let route = '';
          switch (cardTitle) {
            case 'colocation':
              route = '/user/Collocation/showOffer';
              break;
            case 'carpooling':
              route = '/user/carpooling/askC';
              break;
            case 'form':
              route = '/form';
              break;
            case 'event':
              route = '/show';
              break;
            case 'chat':
              route = '/chat';
              break;
            case 'e-commerce':
              route = '/user/Ecommerce/askp';
              break;
            default:
              break;
          }
    
          if (route) {
            this.router.navigate([route]);
          }
        }
    }  
}



currentPostIndex: number = 0;
isPostRollingLeft: boolean = false;
isPostRollingRight: boolean = false;

nextPost() {
  this.isPostRollingLeft = true;
  setTimeout(() => {
    this.isPostRollingLeft = false;
    if (this.currentPostIndex < this.posts.length - 1) {
      this.currentPostIndex++;
    }
  }, 500); // Adjust the timing as needed
}

previousPost() {
  this.isPostRollingRight = true;
  setTimeout(() => {
    this.isPostRollingRight = false;
    if (this.currentPostIndex > 0) {
      this.currentPostIndex--;
    }
  }, 500); // Adjust the timing as needed
}

animationEnded() {
  // Reset the animation state if needed
}

}
