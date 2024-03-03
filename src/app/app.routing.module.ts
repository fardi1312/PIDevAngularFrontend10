import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';


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
      { path: 'addFeedback/:idOffer', component: AddFeedbackComponent }, 
      { path: 'addPreferences', component: AddPreferencesComponent }
    ]
  }
  

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
