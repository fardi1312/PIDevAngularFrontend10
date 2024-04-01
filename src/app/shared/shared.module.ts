import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TemplateComponent
  ],
  imports: [RouterModule, 
    CommonModule
  ]  ,
  exports :[ 
    HeaderComponent, 
    FooterComponent, 
    TemplateComponent
  ]
  
})
export class SharedModule { }
