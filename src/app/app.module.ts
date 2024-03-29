import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { HeadBackComponent } from './BackOffice/head-back/head-back.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { DeleteCollocationComponent } from './Components/Pages/Collocation/offer/delete-collocation/delete-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/Preferences/show-preferences/show-preferences.component';
import { UpdatePreferencesComponent } from './Components/Pages/Collocation/Preferences/update-preferences/update-preferences.component';
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { ShowFeedbackComponent } from './Components/Pages/Collocation/feedback/show-feedback/show-feedback.component';
import { ShowDetailsFeedbackComponent } from './Components/Pages/Collocation/feedback/show-details-feedback/show-details-feedback.component';
import { AddRequestComponent } from './Components/Pages/Collocation/Request/add-request/add-request.component';
import { UpdateFeedbackComponent } from './Components/Pages/Collocation/feedback/update-feedback/update-feedback.component';
import { UpdateRequestComponent } from './Components/Pages/Collocation/update-request/update-request.component';
import { ShowRequestComponent } from './Components/Pages/Collocation/show-request/show-request.component';
import { DeleteRequestComponent } from './Components/Pages/Collocation/delete-request/delete-request.component';
import { MyOffersComponent } from './my-offers/my-offers.component'; 
import { MyOfferComponent } from './my-offer/my-offer.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import * as dayjs from 'dayjs/esm'; 
import {saveAs} from 'file-saver'



@NgModule({
  declarations: [ 
    AppComponent, 
    UpdateFeedbackComponent,  
    ShowRequestComponent,  
    HeadBackComponent,  
    AddFeedbackComponent, 
    ShowFeedbackComponent, 
    ShowDetailsFeedbackComponent, 
    TemplateFrontComponent,
    AddRequestComponent, 
    FooterBackComponent,
    TemplateBackComponent,
    HeadBackComponent, 
    AddCollocationComponent,
    ShowCollocationComponent,
    UpdateCollocationComponent,
    DeleteCollocationComponent,
    ShowDetailsCollocatinComponent,
    AddPreferencesComponent,
    ShowPreferencesComponent,
    UpdatePreferencesComponent, 
    UpdateRequestComponent,
    DeleteRequestComponent, 
    MyOffersComponent,  
    MyOfferComponent, 
    
  ],
  imports: [ 
    BrowserModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    NgxDaterangepickerMd.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ], 
  exports : [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
