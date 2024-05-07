import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';

@Component({
  selector: 'app-mypost9ach',
  templateUrl: './Mypost9ach.component.html',
  styleUrls: ['./Mypost9ach.component.scss'],
})
export class Mypost9achComponent implements OnInit {

  public themeLogo = 'assets/images/logo/2.png';
  public footerLogo = 'assets/images/logo/footer-logo.png';
  public bgImage = 'assets/images/inner-background.jpg';
  public title = 'Dashboard';
  public parent = 'Home';
  public child = 'Favourites';

  public theme_default3 = '#ff5c41';
  public theme_default4 = '#ff8c41';

  PostOffers: Post9ach[] = [];

  constructor(private ecommerceService: EcommerceService,private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.getPost9achByUser();
  }

  getPost9achByUser(): void {
    this.ecommerceService.getPost9achByUser().subscribe(
      (posts: Post9ach[]) => {
        // Filter out posts with the status of 'Cancled'
        this.PostOffers = posts.filter(post => post.statutPost !== 'Canceled');
        console.log('User posts:', this.PostOffers);
      },
      (error) => {
        console.error('Error fetching user posts:', error);
      }
    );
  }

  removePost(idPost: number): void {
    // Find the post with the given ID
    const postToRemove = this.PostOffers.find(post => post.idPost9ach === idPost);
    
    // Check if the post exists and its getSoldQuantity property is 0
    if (postToRemove && postToRemove.quantitySold === 0) {
        this.ecommerceService.removePost(idPost).subscribe(
            () => {
                console.log(`Post with ${postToRemove.title}  removed successfully.`);
                // Remove the post from the PostOffers array
                this.PostOffers = this.PostOffers.filter(post => post.idPost9ach !== idPost);
                this.toastr.success(`Post  ${postToRemove.title} removed successfully.`);  // Show success toast
            },
            (error) => {
                console.error(`Error removing post ${postToRemove.title} :`, error);
                this.toastr.error(`Error removing post ${postToRemove.title} : ${error.message}`);  // Show error toast
            }
        );
    } else {
        this.toastr.info(`Post  ${postToRemove!.title} cannot be removed as it has been sold.`);  // Show info toast
    }
  }
  
  editPost(idpost: number): void {
    this.router.navigate(['smprofile/edit-post', idpost]);
  }
}
