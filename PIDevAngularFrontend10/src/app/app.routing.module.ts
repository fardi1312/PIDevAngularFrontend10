import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
<<<<<<< HEAD
import { AddRoomComponent } from './Components/Pages/Collocation/RoomDetails/add-room/add-room.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/preferences/add-preferences/add-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/preferences/show-preferences/show-preferences.component';
import { UpdatePreferencesComponent } from './Components/Pages/Collocation/preferences/update-preferences/update-preferences.component';
=======
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';
import { AddRequestComponent } from './Components/Pages/Collocation/Request/add-request/add-request.component';
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd


const routes: Routes = [
  {path:"admin",component:TemplateBackComponent},


  { path: '', component: TemplateFrontComponent },
  { 
    path: 'Collocation', 
    children: [
      { path: 'addOffer', component: AddCollocationComponent },
      { path: 'showOffer', component: ShowCollocationComponent },
      { path: 'updateOffer/:id', component: UpdateCollocationComponent },
      { path: 'showDetailsOffer/:id', component: ShowDetailsCollocatinComponent },
<<<<<<< HEAD
      { path: 'RoomDetails', component: AddRoomComponent }

=======
      { path: 'addFeedback/:idOffer', component: AddFeedbackComponent }, 
      { path: 'addPreferences', component: AddPreferencesComponent } , 
      {path : 'addRequest/:idOffer', component: AddRequestComponent}  
>>>>>>> 9cd469df8537a0fdcf57e4bc9ae88a73415421dd
    ]
  },
  { 
    path: 'Preferences', 
    children: [
      { path: 'addPreferences', component: AddPreferencesComponent },
      { path: 'showPreferences', component: ShowPreferencesComponent },
      { path: 'update/:id', component: UpdatePreferencesComponent }
    

    ]
  },
  

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
