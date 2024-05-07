import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CarpoolingOffer } from '../../models/modelSM/CarpoolingOffer';
import { CarpoolingRequest } from '../../models/modelSM/CarpoolingRequest';
import { CarpoolingPreferences } from 'src/app/models/modelSM/CarpoolingPreferenes';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { Panier9ach } from 'src/app/models/modelS/panier9ach';
import { RequestPost9ach } from 'src/app/models/modelS/RequestPost9ach';
//import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  private apiUrl = 'http://localhost:8083/sui2';
  cartItems: { post: Post9ach; quantity: number }[] = [];
  constructor(private http: HttpClient) { }
  addpost9ach( newOffer: Post9ach): Observable<Post9ach> {
    return this.http.post<Post9ach>(`${this.apiUrl}/addP9`, newOffer);
  }

  getAllPost9ach(): Observable<Post9ach[]> {
    return this.http.get<Post9ach[]>(`${this.apiUrl}/getallpost`);
  }

  addToCart(item: Post9ach,selectedQuantity:number): Observable<Panier9ach> {
   
    this.cartItems.push({ post: item, quantity: selectedQuantity });


    return this.http.post<Panier9ach>(`${this.apiUrl}/addtocart`, item);
  }

  removeFromCart(item: Post9ach): Observable<Panier9ach> {
    const index = this.cartItems.findIndex(cartItem => cartItem.post.idPost9ach === item.idPost9ach);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
   
    const url = `${this.apiUrl}/removefromcart/${item.idPost9ach}`;
    return this.http.delete<Panier9ach>(url);
    
}
getCartItems(): Observable<{ post: Post9ach; quantity: number }[]> {
  return new Observable(observer => {
    observer.next(this.cartItems);
    observer.complete();
  });
}

clearCart(): Observable<void> {

  this.cartItems = [];

  const url = `${this.apiUrl}/clearcart`;
  return this.http.delete<void>(url);
}

getPanier(): Observable<Panier9ach> {

  const url = `${this.apiUrl}/getpanier`;
  return this.http.get<Panier9ach>(url);
}
buyPanier(newTotal:Number): Observable<RequestPost9ach> {
  const url = `${this.apiUrl}/buypanier/${newTotal}`;
  return this.http.post<RequestPost9ach>(url, {});
}

getPostById(id: number): Observable<Post9ach> {

  return this.http.get<Post9ach>(`${this.apiUrl}/getPostbyId/${id}`);
}

updatePostAndPoint(idP: number, qts: number): Observable<void> {
  const url = `${this.apiUrl}/updatepostandpoint/${idP}/${qts}`;

  return this.http.put<void>(url, null);
}

updateLikePost(idP: number): Observable<Post9ach> {
  const url = `${this.apiUrl}/updatelikepost/${idP}`;

  return this.http.put<Post9ach>(url, null);
}
getLikedPosts(): Observable<Post9ach[]> {
 
  return this.http.get<Post9ach[]>(`${this.apiUrl}/liked-posts`);
}
getRequestsByUserId(): Observable<RequestPost9ach[]> {
  const url = `${this.apiUrl}/requests`;
  return this.http.get<RequestPost9ach[]>(url);
}
findPanierById(): Observable<Panier9ach[]> {
  const url = `${this.apiUrl}/findpanierbyid`;
  
  return this.http.get<Panier9ach[]>(url);
}

findPostsByPanierId(idPanier: number): Observable<Post9ach[]> {
  const url = `${this.apiUrl}/findpostbuyidpanier/${idPanier}`;
  return this.http.get<Post9ach[]>(url);
}

getPost9achByUser(): Observable<Post9ach[]> {

  return this.http.get<Post9ach[]>(`${this.apiUrl}/userposts`);
}
removePost(postId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/removePost/${postId}`)
      
}
findPostByIdPost(idPost: number): Observable<Post9ach> {
  return this.http.get<Post9ach>(`${this.apiUrl}/getpostbyidpost/${idPost}`);
}
updatePost(idPost: number, updatedPost: Post9ach): Observable<Post9ach> {
  const url = `${this.apiUrl}/updatepost/${idPost}`;
  return this.http.put<Post9ach>(url, updatedPost);
}
}
