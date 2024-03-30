import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './FrontOffice/header/header.component';
import { FootorComponent } from './FrontOffice/footor/footor.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { AppRoutingModule } from './app.routing.module';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { HeadBackComponent } from './BackOffice/head-back/head-back.component';
import { SubmitPropertyComponent } from './Components/Pages/Carpooling/submit-property/submit-property.component';
//import { CarpoolingAskComponent } from './Components/Pages/Carpooling/carpooling-ask/carpooling-ask.component';



import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AddPropertyStepsComponent } from './Components/Pages/Carpooling/widgets/add-property-steps/add-property-steps.component';

import { PropertyGalleryComponent } from './Components/Pages/Carpooling/widgets/property-gallery/property-gallery.component';
import { PropertyConfirmationComponent } from './Components/Pages/Carpooling/widgets/property-confirmation/property-confirmation.component';
import { PropertyGeneralDetailsComponent } from './Components/Pages/Carpooling/widgets/property-general-details/property-general-details.component';
import { PropertyAddressDetailsComponent } from './Components/Pages/Carpooling/widgets/property-address-details/property-address-details.component';
import { FeatherIconsComponent } from './shared/ui/feather-icons/feather-icons.component';

import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';
//import { NgxDropzoneLabelModule } from 'ngx-dropzone';
import { CommonAgencyComponent } from './Components/Pages/Carpooling/common-agency/common-agency.component';
import { AgentListComponent } from './Components/Pages/Carpooling/agent-list/agent-list.component';
import { AgencyAgentsComponent } from './Components/Pages/Carpooling/agency-agents/agency-agents.component';
import { AdvanceFilterComponent } from './Components/Pages/Carpooling/advance-filter/advance-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FootorComponent,
    TemplateFrontComponent,
FooterBackComponent,
TemplateBackComponent,

//CarpoolingAskComponent,
HeadBackComponent,


    FootorComponent,
HeaderComponent,
  

SubmitPropertyComponent,
   
    AddPropertyStepsComponent,
    PropertyGeneralDetailsComponent,
    PropertyAddressDetailsComponent,
    PropertyGalleryComponent,
    PropertyConfirmationComponent,
    FeatherIconsComponent,

    AgentListComponent,
    CommonAgencyComponent,
    AgencyAgentsComponent,
    AdvanceFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatRippleModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [
    // Fournir le TokenInterceptor en tant que fournisseur pour les intercepteurs HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true // Indique que cet interceptor est multi-instance, nécessaire pour HTTP_INTERCEPTORS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
