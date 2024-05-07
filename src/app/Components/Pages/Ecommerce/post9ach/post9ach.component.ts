import { Component, OnInit } from '@angular/core';
import { Post9ach } from 'src/app/models/modelS/Post9ach';

import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';
import { MatDialog } from  '@angular/material/dialog';

@Component({
  selector: 'app-post9ach',
  templateUrl: './post9ach.component.html',
  styleUrls: ['./post9ach.component.css']
})
export class Post9achComponent implements OnInit {
  public activeSteps: number=0;
  
  isCartDialogVisible: number = 0;
  categories: string[] = [
    'Canapés et fauteuils',
    'Tables et chaises',
    'Lits et matelas',
    'Meubles de rangement',
    'Électroménagers',
    'Meubles de cuisine',
    
  ];

  selectedCategory: string = 'All';
  idpostrj3?:number;
  public selectedQuantities: { [index: number]: number } = {};

  selectedquantity: number=0 ;
  quantity: number[]=[0];
  quantityLists: number[][] = [];
post9acha?:Post9ach;
 public post9achs : Post9ach[]=[];
 public post9achs2 : Post9ach[]=[];
  constructor(private ecommerceService: EcommerceService) { }

  fetchLikedPosts(): void {
    
    this.ecommerceService.getLikedPosts().subscribe(
        (likedPosts: Post9ach[]) => {
            const likedPostIds = new Set(likedPosts.map(post => post.idPost9ach));
            
            this.post9achs.forEach(post => {
                if (likedPostIds.has(post.idPost9ach)) {
                    post.isLiked = true;
                } else {
                    post.isLiked = false;
                }
            });
            
            console.log('Updated liked posts:', this.post9achs);
        },
        error => {
            console.error('Error fetching liked posts:', error);
        }
    );
}


  toggleLikes(post: any): void {
    
   

    this.ecommerceService.updateLikePost(post.idPost9ach).subscribe(
      (post9acha: Post9ach) => {
        post.nbslikes=post9acha.nbslikes
          console.log('Like count updated successfully');
          this.fetchLikedPosts();
      },
      error => {
          console.error('Error updating like count:', error);
      }
  );
 

  }
  
filterPosts() {
  
  console.log("allo aloo111111 ",this.selectedCategory)
  if (this.selectedCategory === 'All') {
    this.gettallPost();
  } else {
    this.ecommerceService.getAllPost9ach().subscribe((offers: Post9ach[]) => {
      this.post9achs2 = offers;

      this.quantityLists = offers.map((post) => {
          const quantity = Number(post.quantity);
          return Array.from({ length: quantity }, (_, index) => index + 1);
      });

      console.log('Generated quantity lists:', this.quantityLists);
      console.log('Filtered offers:', this.post9achs2);
  });
    this.post9achs = this.post9achs2.filter(post => post.category === this.selectedCategory);
    console.log("allo aloo ",this.post9achs)
  }
}


  toggleCartDialog() {
    this.activeSteps=0;
    this.isCartDialogVisible = 1;
}
toggleCartDialog2() {
  this.isCartDialogVisible = 0;
}

gettallPost() {
  this.ecommerceService.getAllPost9ach().subscribe((offers: Post9ach[]) => {
      this.post9achs = offers;

      this.quantityLists = offers.map((post) => {
          const quantity = Number(post.quantity);
          return Array.from({ length: quantity }, (_, index) => index + 1);
      });

      console.log('Generated quantity lists:', this.quantityLists);
      console.log('offers:', this.post9achs);
      this.fetchLikedPosts();
  });
  
}
ngOnInit(){


this.gettallPost();





  }
  onAddToCart(item: Post9ach, selectedQuantity: number) {
    const existingCartItem = this.ecommerceService.cartItems.find(cartItem => cartItem.post.idPost9ach === item.idPost9ach);
    
    if (existingCartItem) {
        console.log("tahonsai11",existingCartItem.quantity)
        existingCartItem.quantity =Number(existingCartItem.quantity) + Number(selectedQuantity);
        console.log("tahonsaif2",existingCartItem.quantity);
        this.decreaseAvailableQuantity(item, selectedQuantity);
        console.log(`Updated quantity: ${item.title}`);
    } else {
      console.log("sssssssss",item)
        this.ecommerceService.addToCart(item, selectedQuantity).subscribe(
            (response) => {
                console.log(`Item added to cart: ${item.title}`);
                this.decreaseAvailableQuantity(item, selectedQuantity);
            },
            (error) => {
                console.error(`Failed to add item to cart: ${error.message}`);
            }
        );
    }
}


decreaseAvailableQuantity(post: Post9ach, selectedQuantity: number) {
  const offer = this.post9achs.find(p => p === post);
  if (offer) {
      let currentQuantity = Number(offer.quantity) || 0;

      currentQuantity -= selectedQuantity;

      if (currentQuantity < 0) {
          currentQuantity = 0;
      }

      offer.quantity = currentQuantity.toString();

      this.updateQuantityList(offer);
  }
}


updateQuantityList(post: Post9ach) {
  const quantity = Number(post.quantity) || 0;
console.log("ddddddd",this.quantityLists)
console.log("vvvvv",this.post9achs)
console.log("dsssdssss",post)


  const index = this.post9achs.indexOf(post);
  console.log("zonfakh",index)
  if (index !== -1) {
    console.log("",this.quantityLists[index])
      this.quantityLists[index] = Array.from({ length: quantity }, (_, i) => i + 1);
      console.log("",this.quantityLists[index])
  }
}
updateQuantityList2(post: Post9ach) {
  const quantity = Number(post.quantity) || 0;
  console.log("ddddddd", this.quantityLists);
  console.log("vvvvv", this.post9achs);
  console.log("dsssdssss", post);

  const index = this.post9achs.findIndex(p => p.idPost9ach === post.idPost9ach);
  
  console.log("zonfakh", index);
  
  if (index !== -1) {
      console.log("", this.quantityLists[index]);
      this.quantityLists[index] = Array.from({ length: quantity }, (_, i) => i + 1);
      console.log("", this.quantityLists[index]);
      
      this.post9achs[index] = post;
      console.log("Updated Post9ach:", this.post9achs[index]);
  }
}



  public receiveChildData(step: number) {
    this.activeSteps = step;
  }

  public receiverj3(idpost: number) {
console.log("hhhhhhhhhhh0000",this.post9achs)
    this.idpostrj3 = idpost;
    this.ecommerceService.getPostById(idpost).subscribe(
      (data: Post9ach) => {
        console.log("haeabi",data),
        this.updateQuantityList2(data);
        console.log("hhhhhhhhhhh22222",this.post9achs)

     
      },
      error => {
  
        console.error('Error fetching Post9ach:', error);
      }
    );
  }
}



