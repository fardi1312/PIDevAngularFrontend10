import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { category, propertyStatus } from 'src/app/shared/data/advance-filter';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';

import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { EcommerceService } from 'src/app/services/serviceS/ecommerce.service';
import { Post9ach } from 'src/app/models/modelS/Post9ach';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addpost9ach',
  templateUrl: './addpost9ach.component.html',
  styleUrls: ['./addpost9ach.component.css']
})
export class Addpost9achComponent {
  



post : Post9ach={};
selectedNbPlacesRetour: number=0  ;
  public activeStep: number = 1;
  public validate: boolean = false;
  public activeId: number =1 ;
  public propertyStatus = propertyStatus;
 img?:String;

  title:string='';
 
  pn:string='';
  
  location1:string='';
price?:number;
type?:string;
etat?:string;

descriprion1:string='';
public myForm1 = new FormGroup({
 location : new FormControl('', Validators.required),

 phone : new FormControl('', Validators.required),
  property_status: new FormControl('', Validators.required),
  property_price: new FormControl('', Validators.required),

   typee: new FormControl('', Validators.required),
   etatt: new FormControl('', Validators.required),
  description: new FormControl('', Validators.required),
  
});
  

  
  
 
  constructor(private toaster: ToastrService,private ecommerceService: EcommerceService) { }

  


 
  get property_status() {
    return this.myForm1.get('property_status');
  }
  get location() {
    return this.myForm1.get('location');
  }
  get phone() {
    return this.myForm1.get('phone');
  }

  get property_price() {
    return this.myForm1.get('property_price');
  }
  get typee() {
    return this.myForm1.get('typee');
  }
  get etatt() {
    return this.myForm1.get('etatt');
  }
 
  get description() {
    return this.myForm1.get('description');
  }



 

  public files: File[] = [];
  pathimage:string='';
  public validation: boolean = false;
  



  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  
  trackFn(index: number, item: any) {
    return item.id;
  }



  addpost(title:string,price:number,phone:string,location:string,descr:string,type:string,etat:string){
    console.log("tt",etat,type)

    if (this.myForm1.invalid ){
      this.validate = true;
      
     
 
    }
    else {

      this.pathimage=this.files[0].name;

      const number = this.activeStep + 1;
      
this.post.image="assetsaif/images/about/"+this.pathimage;


      this.post.title=title;
      this.post.quantity=phone;
      this.post.price=price;
      this.post.location=location;
      this.post.description=descr;
      this.post.category=type;
      this.post.etat=etat;
      this.post.quantitySold=0;
      console.log(this.post);
this.ecommerceService.addpost9ach(this.post).subscribe(
  (addedOffer) => {
    console.log('New post added:', addedOffer);
    this.toaster.success('Post added successfully');

    
  },
  (error) => {
    console.error('Error post offer:', error);
  this.toaster.error('errro');

  }
);
    }
  }
  

  

}
