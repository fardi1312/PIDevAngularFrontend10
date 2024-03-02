import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './FrontOffice/header/header.component';
import { FootorComponent } from './FrontOffice/footor/footor.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { AppRoutingModule } from './app.routing.module';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { HeadBackComponent } from './BackOffice/head-back/head-back.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FootorComponent,
    TemplateFrontComponent,
FooterBackComponent,
TemplateBackComponent,
HeadBackComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
