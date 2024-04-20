import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';
import { ShowFeedbackComponent } from './Components/Pages/Collocation/feedback/show-feedback/show-feedback.component';
import { ShowDetailsFeedbackComponent } from './Components/Pages/Collocation/feedback/show-details-feedback/show-details-feedback.component';
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { AddRequestComponent } from './Components/Pages/Collocation/Request/add-request/add-request.component';
import { UpdateFeedbackComponent } from './Components/Pages/Collocation/feedback/update-feedback/update-feedback.component';
import { DeleteFeedbackComponent } from './Components/Pages/Collocation/feedback/delete-feedback/delete-feedback.component';
import { ShowRequestComponent } from './Components/Pages/Collocation/show-request/show-request.component';
import { UpdateRequestComponent } from './Components/Pages/Collocation/update-request/update-request.component';
import { DeleteRequestComponent } from './Components/Pages/Collocation/delete-request/delete-request.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { MyOffersComponent } from './my-offers/my-offers.component'; 
import { MyOfferComponent } from './my-offer/my-offer.component';
import { UpdatePreferencesComponent } from './Components/Pages/Collocation/Preferences/update-preferences/update-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/Preferences/show-preferences/show-preferences.component';
import { AddClubComponent } from './Components/Pages/add-club/add-club.component';
import { ShowClubsComponent } from './Components/Pages/show-clubs/show-clubs.component';


const routes: Routes = [
  { path: "admin", component: TemplateBackComponent },

  { path: '', component: TemplateFrontComponent },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
  },
  {
    path: 'Collocation',
    children: [
      { path: 'addOffer', component: AddCollocationComponent },
      { path: 'showOffer', component: ShowCollocationComponent },
      { path: 'updateOffer/:id', component: UpdateCollocationComponent },
      { path: 'showDetailsOffer/:id', component: ShowDetailsCollocatinComponent },
      { path: 'showFeedback', component: ShowFeedbackComponent },
      { path: 'showFeedbackDetails', component: ShowDetailsFeedbackComponent },
      { path: 'addRequest/:idOffer', component: AddRequestComponent },
      { path: 'addFeedback/:idOffer', component: AddFeedbackComponent },
      { path: 'updateFeedback/:id', component: UpdateFeedbackComponent },
      { path: 'deleteFeedback/:id', component: DeleteFeedbackComponent },
      { path: 'showRequest', component: ShowRequestComponent },
      { path: 'updateRequest/:idRequest', component: UpdateRequestComponent },
      { path: 'deleteRequest/:idRequest', component: DeleteRequestComponent }, 
      {path: 'myOffers',component:MyOffersComponent}  ,
      {path:'myOffer/:id',component:MyOfferComponent}  
      

    ],
  }, 
  {
    path:'Club',
    children :[ 
      { path:'showClubs', component : ShowClubsComponent}, 
      { path:'addClub', component : AddClubComponent}, 
    ]
  }, 

  {
    path: 'Preferences',
    children: [
      { path: 'addPreferences', component: AddPreferencesComponent },
      { path: 'showPreferences', component: ShowPreferencesComponent },
      { path: 'update/:id', component: UpdatePreferencesComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)], 
    declarations: [],

    exports: [RouterModule]
  })
export class AppRoutingModule { }
