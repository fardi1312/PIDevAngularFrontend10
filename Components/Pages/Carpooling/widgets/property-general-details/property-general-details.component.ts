import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { propertyStatus } from 'src/app/shared/data/advance-filter';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-property-general-details',
  templateUrl: './property-general-details.component.html',
  styleUrls: ['./property-general-details.component.scss'],
})

export class PropertyGeneralDetailsComponent {
Carpoolingoffer: CarpoolingOffer={ locationLx: '',
locationLy: '',} ;
csaif:CarpoolingOffer={ locationLx: '',
locationLy: '',};
  @Output() activeSteps = new EventEmitter<number>();
  @Output() activeCO = new EventEmitter<CarpoolingOffer>();
  public activeStep: number = 1;
  public validate: boolean = false;
  public activeId: number =1 ;
  public propertyStatus = propertyStatus;
  wa9ta : string ='';
  wa9tr : string='' ;
 

  forwho:string='';
 
price?:number;

type:string='';
pa?:number;
pr?:number;
da:string='';
dr:string='';
ha:string='';
hr:string='';
desc:string='';
public myForm1 = new FormGroup({
 
  property_status: new FormControl('', Validators.required),
  property_price: new FormControl('', Validators.required),



 // description: new FormControl('', Validators.required),
  typee:new FormControl('', Validators.required),
});
  public myForm2 = new FormGroup({
 
  
   
    prr:new FormControl('', Validators.required),
    
    drr: new FormControl('', [Validators.required, this.dateRetourValidator.bind(this)]),
  
    hrr:new FormControl('', Validators.required),
  });

  dateRetourValidator(control: FormControl): { [key: string]: boolean } | null {
    const dateRetour = new Date(control.value);
    const dateActuelle = new Date();
    if (dateRetour <= dateActuelle) {
      return { 'dateRetourInvalide': true };
    }
    return null;
  }
  dateAllerValidator(control: FormControl): ValidationErrors | null {
    const dateAller = new Date(control.value);
    const dateActuelle = new Date();
    if (dateAller <= dateActuelle) {
      return { 'dateAllerInvalide': true };
    }
    return null;
  }
  
  public myForm3 = new FormGroup({
 
  
    
    paa:new FormControl('', Validators.required),
    
    daa: new FormControl('', [Validators.required, this.dateAllerValidator.bind(this)]),
  
    haa:new FormControl('', Validators.required),
    
  });

  constructor(private carpoolingService: CarpoolingService) { }

  
  next(userId: number,forwho:string,price:number,type:string,pa:number,da:string,ha:string,pr:number,dr:string,hr:string) {
console.log("for",forwho);
this.Carpoolingoffer.forWho=forwho;
    if (this.myForm1.invalid ){
      this.validate = true;
      
     
 
    }
    else{
      
     if (this.myForm2.invalid && type=="Retour"){
    
      this.validate = true;
      
 
     }
   
     

     else if (this.myForm3.invalid && type=="Aller"){
      this.validate = true;
      
     
     }
     else if (this.myForm3.invalid && this.myForm2.invalid && type=="Aller_et_Retour"){
      this.validate = true;
   
      
     }

     else {
      console.log("t3ada")
      const number = this.activeStep + 1;
      this.activeSteps.emit(number);
      

this.Carpoolingoffer.price=price;
this.Carpoolingoffer.carpoolingType=type;
this.Carpoolingoffer.placeDispoAller=pa;
this.Carpoolingoffer.placeDispoRetour=pr;



this.wa9ta=da+' '+ha;
this.wa9tr=dr+' '+hr;
console.log('flclasse22', this.wa9ta);
const dateRetour = dr + ' ' + hr;
            console.log('flclasse22', dateRetour);
this.Carpoolingoffer.dateAller=this.wa9ta;
this.Carpoolingoffer.dateRetour=this.wa9tr;
      this.carpoolingService.add(userId, this.Carpoolingoffer).subscribe(
        (addedOffer) => {
          console.log('New offer added:', addedOffer);
          this.activeCO.emit(addedOffer);
          
        },
        (error) => {
          console.error('Error adding offer:', error);
        }
      );

      
       
        
      

    }
  }
  }

 
  get property_status() {
    return this.myForm1.get('property_status');
  }

  get property_price() {
    return this.myForm1.get('property_price');
  }


  get bed() {
    return this.myForm1.get('bed');
  }

 
  get typee(){
    return this.myForm1.get('typee')
  }

  
  
  get description() {
    return this.myForm1.get('description');
  }
  get daa(){
    return this.myForm3.get('daa')
  }
  get drr(){
    return this.myForm2.get('drr')
  }
  get haa(){
    return this.myForm3.get('haa')
  }
  get hrr(){
    return this.myForm2.get('hrr')
  }

  get paa(){
    return this.myForm3.get('paa')
  }
  get prr(){
    return this.myForm2.get('prr')
  }

}
