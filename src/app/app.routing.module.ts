import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/preferences/add-preferences/add-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/preferences/show-preferences/show-preferences.component';
import { UpdatePreferencesComponent } from './Components/Pages/Collocation/preferences/update-preferences/update-preferences.component';


const routes: Routes = [
  {path:"admin",component:TemplateBackComponent},


  { path: '', component: TemplateFrontComponent },
  { 
    path: 'Collocation', 
    children: [
      { path: 'addOffer', component: AddCollocationComponent },
      { path: 'showOffer', component: ShowCollocationComponent },
      { path: 'updateOffer/:id', component: UpdateCollocationComponent },
      { path: 'showDetailsOffer/:id', component: ShowDetailsCollocatinComponent }

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
