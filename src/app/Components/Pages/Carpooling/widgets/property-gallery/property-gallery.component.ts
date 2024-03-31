import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';
import { CarpoolingService } from 'src/app/Services/servicesSM/carpoolings.service';

@Component({
  selector: 'app-property-gallery',
  templateUrl: './property-gallery.component.html',
  styleUrls: ['./property-gallery.component.scss'],
})
export class PropertyGalleryComponent {
  activeCo: CarpoolingOffer={ locationLx: '',
  locationLy: '',};
  @Output() activeCOO = new EventEmitter<CarpoolingOffer>();

  @Output() activeSteps = new EventEmitter<number>();
  @Input() activeCoo: CarpoolingOffer={ locationLx: '',
  locationLy: '',};
  public activeStep: number = 3;
  public files: File[] = [];
  pathimage:string='';
  public validation: boolean = false;
  constructor(private carpoolingService: CarpoolingService) { }

  previous() {
    const number = this.activeStep - 1;
    this.activeSteps.emit(number);
  }

  next() {
   
    if(this.files.length >= 1){

      console.log('taswira',this.files)
this.pathimage=this.files[0].name;

      const number = this.activeStep + 1;
      this.activeSteps.emit(number);
this.activeCoo.img="assetsaif/images/about/"+this.pathimage;

this.activeCoo.carpoolingStatus="Active";
      if(typeof this.activeCoo.carpoolingOfferID=="number"){
    
          this.carpoolingService.updateOffer(this.activeCoo.carpoolingOfferID,this.activeCoo).subscribe(
            (uOf) => {
              console.log('New offer update:', uOf);
              this.activeCOO.emit(uOf);
            },
            (error) => {
              console.error('Error adding offer:', error);
            }
      
          )
          }




    }else{
      this.validation = true;
    }
  }

  onSelect(event: NgxDropzoneChangeEvent) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public receiveCarpoolingOffer(co:CarpoolingOffer) {
    this.activeCo= co;
  }
  trackFn(index: number, item: any) {
    return item.id;
  }
  

  
}
