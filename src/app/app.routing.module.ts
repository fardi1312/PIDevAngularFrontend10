import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
import { ShowBackOfficeComponent } from './Components/Pages/Collocation/offer/show-back-office/show-back-office.component';
import { LoginComponent } from './Components/Pages/User/login/login.component';
import { ProfileComponent } from './Components/Pages/User/profile/ProfileComponent';
import { UpdateUserInfoComponentComponent } from './Components/Pages/User/update-user-info-component/update-user-info-component.component';
import { DeleteUserComponent } from './Components/Pages/User/delete-user/delete-user.component';
import { UpdatePhotoProfileComponent } from './Components/Pages/User/update-photo-profile/update-photo-profile.component';
import { UpdateCoverPhotoProfileComponent } from './Components/Pages/User/update-cover-photo-profile/update-cover-photo-profile.component';
import { ShowPhotoProfileComponent } from './Components/Pages/User/show-photo-profile/show-photo-profile.component';
import { PhotoUploadDialogComponent } from './Components/Pages/User/photo-upload-dialog/photo-upload-dialog.component';
import { ViewPhotoDialogComponent } from './Components/Pages/User/view-photo-dialog/view-photo-dialog.component';
import { UpdatePasswordComponent } from './Components/Pages/User/update-password/update-password.component';
import { AuthGuard } from './Environments/AuthGuard';
import { SignupComponent } from './Components/Pages/User/signup/signup.component';
import { ForgotPasswordComponent } from './Components/Pages/User/forgot-password/forgot-password.component';
import { SubmitPropertyComponent } from './Components/Pages/Carpooling/submit-property/submit-property.component';
import { AgentListComponent } from './Components/Pages/Carpooling/agent-list/agent-list.component';
import { AdminUsersComponent } from './Components/Pages/User/admin-users/admin-users.component';
import { AdminProfileComponent } from './Components/Pages/User/admin-profile/admin-profile.component';
import { TransferPointsComponent } from './Components/Pages/Carpooling/transfer-points/transfer-points.component';
import { UpdateFeedbackComponent } from './Components/Pages/Collocation/feedback/update-feedback/update-feedback.component';
import { ShowRequestComponent } from './Components/Pages/Collocation/show-request/show-request.component';
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { ShowFeedbackComponent } from './Components/Pages/Collocation/feedback/show-feedback/show-feedback.component';
import { ShowDetailsFeedbackComponent } from './Components/Pages/Collocation/feedback/show-details-feedback/show-details-feedback.component';
import { AddRequestComponent } from './Components/Pages/Collocation/Request/add-request/add-request.component';
import { DeleteFeedbackComponent } from './Components/Pages/Collocation/feedback/delete-feedback/delete-feedback.component';
import { UpdateRequestComponent } from './Components/Pages/Collocation/update-request/update-request.component';
import { DeleteRequestComponent } from './Components/Pages/Collocation/delete-request/delete-request.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/Preferences/show-preferences/show-preferences.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateprefrencesComponent } from './Components/Pages/Collocation/Preferences/updateprefrences/updateprefrences.component';
import { SearchCollocationComponent } from './Components/Pages/Collocation/offer/search-collocation/search-collocation.component';
import { AddSubscriptionComponent } from './Components/Subscription/add-subscription/add-subscription.component';
import { ListSubscriptionComponent } from './Components/Subscription/list-subscription/list-subscription/list-subscription.component';
import { DeleteSubscriptionComponent } from './Components/Subscription/delete-subscription/delete-subscription.component';
import { EditSubscriptionComponent } from './Components/Subscription/edit-subscription/edit-subscription.component';
import { AllRegistrationComponent } from './Components/Pages/Registration/all-registration/all-registration.component';
import { UpdateRegistrationComponent } from './Components/Pages/Registration/update-registration/update-registration.component';
import { DetailsRegistrationComponent } from './Components/Pages/Registration/details-registration/details-registration.component';
import { FrontSubscriptionComponent } from './front-subscription/front-subscription.component';
import { AddRegistrationComponent } from './Components/Pages/Registration/add-registration/add-registration.component';
import { PaymentComponent } from './payment/payment.component';
import { WalletComponent } from './wallet/wallet.component';
import { TimelineComponent } from './Components/Pages/Forum/timeline/TimelineComponent';
import {PostDetailComponent} from "./Components/Pages/Forum/post-detail/post-detail.component";
import {MessageComponent} from "./Components/Pages/Forum/message/message.component";
import { ProfileUserComponent } from './Components/Pages/User/profile-user/profile-user.component';
import { PostsTagsComponent } from './Components/Pages/Forum/posts-tags/posts-tags.component';
import { UserstatComponent } from './Components/Pages/User/userstat/userstat.component';
import { AccountVerificationComponent } from './Components/Pages/User/account-verification/account-verification.component';
import { ForgotUpdPasswordComponent } from './Components/Pages/User/forgotupd-password/forgotupd-passwordcomponent';
import { Addpost9achComponent } from './Components/Pages/Ecommerce/addpost9ach/addpost9ach.component';
import { Post9achComponent } from './Components/Pages/Ecommerce/post9ach/post9ach.component';
import { MultiformsComponent } from './Components/Pages/Events/multiforms/multiforms.component';
import { ShowClubsComponent } from './Components/Pages/Club/show-clubs/show-clubs.component';
import { AddClubComponent } from './Components/Pages/Club/add-club/add-club.component';
import { ShowClubDetailsComponent } from './Components/Pages/Club/show-club-details/show-club-details.component';
import { MyClubComponent } from './Components/Pages/my-club/my-club.component';
import { HedhahuComponent } from './Components/Pages/Events/hedhahu/hedhahu.component';
import { HomeComponent } from './Components/Pages/Home/home/home.component';
import { BackOfficeQuizComponent } from './Components/Pages/Home/back-office-quiz/back-office-quiz.component';
import { CouponBackComponent } from './Components/Pages/Home/coupon-back/coupon-back.component';
import { StatChartComponent } from './Components/Pages/Home/stat-chart/stat-chart.component';
import { FavouritesComponent } from './Components/Pages/SMProfile/favourites/favourites.component';
import { Mycommandes } from './Components/Pages/SMProfile/Mycommandes/Mycommandes.component';
import { Mypost9achComponent } from './Components/Pages/SMProfile/MyPost9ach/Mypost9ach.component';
import { MyCarpoolingRequest } from './Components/Pages/SMProfile/MyCarpoolingRequest/MyCarpoolingRequest.component';
import { Editpost9achComponent } from './Components/Pages/Ecommerce/editpost9ach/editpost9ach.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { MessageamiraComponent } from './message/messageamira.component';
import { StatSaifComponent } from './Components/Pages/Home/stat-saif/stat-saif.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { 
    path: 'smprofile', 
    children: [
      { path: 'carpooling', component: FavouritesComponent },
        { path: 'commandes', component: Mycommandes },
        { path: 'post9ach', component: Mypost9achComponent },
        { path: 'carpoolingrequest', component: MyCarpoolingRequest },
        { path: 'edit-post/:idPost9ach', component: Editpost9achComponent },


    ]

    
  },


  {
    path:'Club',
    children :[ 
      { path:'showClubs', component : ShowClubsComponent}, 
      { path:'addClub', component : AddClubComponent},  
      { path:'showClub/:id', component : ShowClubDetailsComponent}, 
      {path:'myClub/:id',component : MyClubComponent} ,
    ]
  }, 

  {path:"addEvent",component:MultiformsComponent},
  {path:"show",component:HedhahuComponent},



  { path: 'user/timeline', component: TimelineComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'posts/:postId', component: PostDetailComponent },
  { path: 'message', component: MessageComponent },
  { path: 'posts/tags/:tagName', component: PostsTagsComponent },
  { path: 'user/profile/:userId', component: ProfileUserComponent },
  { path: 'userstat', component: UserstatComponent },

  { path: 'forgotupd/:email', component: ForgotUpdPasswordComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin', canActivate: [AuthGuard], 
    children: [

      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: "showPreferences", component: ShowPreferencesComponent },
      { path: "showOffors", component: ShowBackOfficeComponent },
      { path: "subscription/add", component: AddSubscriptionComponent },
      { path: "Subscriptions", component: ListSubscriptionComponent },
      { path: "subscription/delete/:id", component: DeleteSubscriptionComponent },
      { path: "subscription/edit/:id", component: EditSubscriptionComponent },
      { path: "registration/all", component: AllRegistrationComponent },
      { path: 'registrations/:id/update', component: UpdateRegistrationComponent },
      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: "showPreferences", component: ShowPreferencesComponent },
      { path: "showOffors", component: ShowBackOfficeComponent },
      { path: "subscription/add", component: AddSubscriptionComponent },
      { path: "subscription/delete/:id", component: DeleteSubscriptionComponent },
      { path: "subscription/edit/:id", component: EditSubscriptionComponent },
      { path: "Registrations", component: AllRegistrationComponent },
      { path: "Quiz", component: BackOfficeQuizComponent },
      { path: "Coupon", component: CouponBackComponent },
      { path: "registration/details/:id", component: DetailsRegistrationComponent },

      { path: "StatCollocation", component: StatChartComponent },
      { path: "StatMaram", component: ReportsComponent },
      { path: 'Settings', component: SettingsComponent }

    ]
  },

  {
    path: 'statsaif', component:  StatSaifComponent
  },
  { path: 'user', canActivate: [AuthGuard], 
    children: [
      { path: 'home', component: HomeComponent },

      { path: 'client', component: TemplateFrontComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'updateuserinfo', component: UpdateUserInfoComponentComponent },
      { path: 'deleteuser', component: DeleteUserComponent },
      { path: 'updatephotoprofile', component: UpdatePhotoProfileComponent },
      { path: 'updatecoverphotoprofile', component: UpdateCoverPhotoProfileComponent },
      { path: 'showphotoprofile', component: ShowPhotoProfileComponent },
      { path: 'photo-upload-dialog', component: PhotoUploadDialogComponent },
      { path: 'view-photo-dialog', component: ViewPhotoDialogComponent },
      { path: 'updatepassword', component: UpdatePasswordComponent },
      { path: 'carpooling/addC', component: SubmitPropertyComponent },
      { path: 'carpooling/askC', component: AgentListComponent },
      { path: 'Ecommerce/addp', component: Addpost9achComponent },
      { path: 'Ecommerce/askp', component: Post9achComponent },
      { path: 'point', component: TransferPointsComponent },
      { path: 'accountVerif', component: AccountVerificationComponent },
      //ACHREF
      { path: 'Collocation/addOffer', component: AddCollocationComponent },
      { path: 'Collocation/showOffer', component: ShowCollocationComponent },
      { path: 'Collocation/updateOffer/:id', component: UpdateCollocationComponent },
      { path: 'Collocation/showDetailsOffer/:id', component: ShowDetailsCollocatinComponent },
      { path: 'Collocation/showFeedback', component: ShowFeedbackComponent },
      { path: 'Collocation/showFeedbackDetails', component: ShowDetailsFeedbackComponent },
      { path: 'Collocation/addRequest/:idOffer', component: AddRequestComponent },
      { path: 'Collocation/addFeedback/:idOffer', component: AddFeedbackComponent },
      { path: 'Collocation/updateFeedback/:id', component: UpdateFeedbackComponent },
      { path: 'Collocation/deleteFeedback/:id', component: DeleteFeedbackComponent },
      { path: 'Collocation/showRequest', component: ShowRequestComponent },
      { path: 'Collocation/updateRequest/:idRequest', component: UpdateRequestComponent },
      { path: 'Collocation/deleteRequest/:idRequest', component: DeleteRequestComponent },
      { path: 'Collocation/myOffers', component: MyOffersComponent },
      { path: 'Collocation/myOffer/:id', component: MyOfferComponent },
      { path: 'Collocation/addPreferences', component: AddPreferencesComponent },

      { path: 'Collocation/showPreferences', component: ShowPreferencesComponent },
      { path: 'Collocation/update/:id', component: UpdateprefrencesComponent },
      { path: 'Collocation/SearchCollocation', component: SearchCollocationComponent },
      //AMIRA PATHS
      { path: "registration/update/:id", component: UpdateRegistrationComponent },
      { path: "SubscriptionsOffers", component: FrontSubscriptionComponent },
      { path: 'SubscriptionsOffers/add-registration/:subscriptionId', component: AddRegistrationComponent },
      { path: 'registration/payment', component: PaymentComponent },
      { path: 'registration/wallet', component: WalletComponent },
      { path: 'chatfinal', component: MessageamiraComponent },
      { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) }
    ]
  },


{ 
  path: 'Ecommerce', 
  children: [
    { path: 'addp', component: Addpost9achComponent },
      { path: 'askp', component: Post9achComponent },
    

  ]

  
},

{ path: '**', redirectTo: '/login', pathMatch: 'full',  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
