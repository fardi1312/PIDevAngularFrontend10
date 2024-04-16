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

const routes: Routes = [
  { path: 'user/timeline', component: TimelineComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'posts/:postId', component: PostDetailComponent },
  { path: 'message', component: MessageComponent },
  { path: 'posts/tags/:tagName', component: PostsTagsComponent },
  { path: 'user/profile/:userId', component: ProfileUserComponent },



  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin', canActivate: [AuthGuard], 
    children: [
      { path: 'admin-users', component: AdminUsersComponent },
      { path: 'admin-profile', component: AdminProfileComponent },
      { path: "showPreferences", component: ShowPreferencesComponent },
      { path: "showOffors", component: ShowBackOfficeComponent },
      { path: "subscription/add", component: AddSubscriptionComponent },
      { path: "dashboard", component: ListSubscriptionComponent },
      { path: "subscription/delete/:id", component: DeleteSubscriptionComponent },
      { path: "subscription/edit/:id", component: EditSubscriptionComponent },
      { path: "registration/all", component: AllRegistrationComponent },

    ]
  },
  { path: 'user', canActivate: [AuthGuard], 
    children: [
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
      { path: 'point', component: TransferPointsComponent },
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
      { path: "registration/details/:id", component: DetailsRegistrationComponent },
      { path: "subscription/offers", component: FrontSubscriptionComponent },
      { path: 'subscription/offers/add-registration/:subscriptionId', component: AddRegistrationComponent },
      { path: 'registration/payment', component: PaymentComponent },
      { path: 'registration/wallet', component: WalletComponent },
      { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
