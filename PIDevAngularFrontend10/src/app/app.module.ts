import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './FrontOffice/header/header.component';
import { FootorComponent } from './FrontOffice/footor/footor.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { AppRoutingModule } from './app.routing.module';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { HeadBackComponent } from './BackOffice/head-back/head-back.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { DeleteCollocationComponent } from './Components/Pages/Collocation/offer/delete-collocation/delete-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
<<<<<<< HEAD
import { AddRoomComponent } from './Components/Pages/Collocation/RoomDetails/add-room/add-room.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/preferences/add-preferences/add-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/preferences/show-preferences/show-preferences.component';
import { UpdatePreferencesComponent } from './Components/Pages/Collocation/preferences/update-preferences/update-preferences.component';
=======
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { ShowFeedbackComponent } from './Components/Pages/Collocation/feedback/show-feedback/show-feedback.component';
import { DeleteFeedbackComponent } from './Components/Pages/Collocation/feedback/delete-feedback/delete-feedback.component';
import { UpdateFeedbackComponent } from './Components/Pages/Collocation/feedback/update-feedback/update-feedback.component';
import { ShowDetailsFeedbackComponent } from './Components/Pages/Collocation/feedback/show-details-feedback/show-details-feedback.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';
import { AddRequestComponent } from './Components/Pages/Collocation/Request/add-request/add-request.component';
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FootorComponent,
    TemplateFrontComponent,
FooterBackComponent,
TemplateBackComponent,
HeadBackComponent,
AddCollocationComponent,
ShowCollocationComponent,
UpdateCollocationComponent,
DeleteCollocationComponent,
ShowDetailsCollocatinComponent,
<<<<<<< HEAD
AddRoomComponent,
AddPreferencesComponent,
ShowPreferencesComponent,
UpdatePreferencesComponent

=======
AddFeedbackComponent,
ShowFeedbackComponent,
DeleteFeedbackComponent,
UpdateFeedbackComponent,
ShowDetailsFeedbackComponent,
AddPreferencesComponent, 
AddRequestComponent, 
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
