import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './token.interceptor';
import { AppComponent } from './app.component';
import { FootorComponent } from './FrontOffice/footor/footor.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { HeadBackComponent } from './BackOffice/head-back/head-back.component';
import { SubmitPropertyComponent } from './Components/Pages/Carpooling/submit-property/submit-property.component';
import { AddPropertyStepsComponent } from './Components/Pages/Carpooling/widgets/add-property-steps/add-property-steps.component';
import { PropertyGalleryComponent } from './Components/Pages/Carpooling/widgets/property-gallery/property-gallery.component';
import { PropertyConfirmationComponent } from './Components/Pages/Carpooling/widgets/property-confirmation/property-confirmation.component';
import { PropertyGeneralDetailsComponent } from './Components/Pages/Carpooling/widgets/property-general-details/property-general-details.component';
import { PropertyAddressDetailsComponent } from './Components/Pages/Carpooling/widgets/property-address-details/property-address-details.component';
import { FeatherIconsComponent } from './shared/ui/feather-icons/feather-icons.component';
import { CommonAgencyComponent } from './Components/Pages/Carpooling/common-agency/common-agency.component';
import { AgentListComponent } from './Components/Pages/Carpooling/agent-list/agent-list.component';
import { AgencyAgentsComponent } from './Components/Pages/Carpooling/agency-agents/agency-agents.component';
import { AdvanceFilterComponent } from './Components/Pages/Carpooling/advance-filter/advance-filter.component';
import { CustomizerComponent } from './shared/ui/customizer/customizer.component';
import { TransferPointsComponent } from './Components/Pages/Carpooling/transfer-points/transfer-points.component';
import { LoginComponent } from './Components/Pages/User/login/login.component';
import { SignupComponent } from './Components/Pages/User/signup/signup.component';
import { ForgotPasswordComponent } from './Components/Pages/User/forgot-password/forgot-password.component';
import { ProfileComponent } from './Components/Pages/User/profile/ProfileComponent';
import { UpdateUserInfoComponentComponent } from './Components/Pages/User/update-user-info-component/update-user-info-component.component';
import { DeleteUserComponent } from './Components/Pages/User/delete-user/delete-user.component';
import { UpdatePhotoProfileComponent } from './Components/Pages/User/update-photo-profile/update-photo-profile.component';
import { UpdateCoverPhotoProfileComponent } from './Components/Pages/User/update-cover-photo-profile/update-cover-photo-profile.component';
import { UpdatePasswordComponent } from './Components/Pages/User/update-password/update-password.component';
import { ShowPhotoProfileComponent } from './Components/Pages/User/show-photo-profile/show-photo-profile.component';
import { PhotoUploadDialogComponent } from './Components/Pages/User/photo-upload-dialog/photo-upload-dialog.component';
import { ViewPhotoDialogComponent } from './Components/Pages/User/view-photo-dialog/view-photo-dialog.component';
import { AdminUsersComponent } from './Components/Pages/User/admin-users/admin-users.component';
import { UserDetailsDialogComponent } from './Components/Pages/User/user-details-dialog/user-details-dialog.component';
import { AdminProfileComponent } from './Components/Pages/User/admin-profile/admin-profile.component';
import { AppRoutingModule } from './app.routing.module';
import { UpdateFeedbackComponent } from './Components/Pages/Collocation/feedback/update-feedback/update-feedback.component';
import { ShowRequestComponent } from './Components/Pages/Collocation/show-request/show-request.component';
import { AddFeedbackComponent } from './Components/Pages/Collocation/feedback/add-feedback/add-feedback.component';
import { ShowFeedbackComponent } from './Components/Pages/Collocation/feedback/show-feedback/show-feedback.component';
import { ShowDetailsFeedbackComponent } from './Components/Pages/Collocation/feedback/show-details-feedback/show-details-feedback.component';
import { AddRequestComponent } from './Components/Pages/Collocation/Request/add-request/add-request.component';
import { AddCollocationComponent } from './Components/Pages/Collocation/offer/add-collocation/add-collocation.component';
import { ShowCollocationComponent } from './Components/Pages/Collocation/offer/show-collocation/show-collocation.component';
import { UpdateCollocationComponent } from './Components/Pages/Collocation/offer/update-collocation/update-collocation.component';
import { DeleteCollocationComponent } from './Components/Pages/Collocation/offer/delete-collocation/delete-collocation.component';
import { ShowDetailsCollocatinComponent } from './Components/Pages/Collocation/offer/show-details-collocatin/show-details-collocatin.component';
import { AddPreferencesComponent } from './Components/Pages/Collocation/Preferences/add-preferences/add-preferences.component';
import { ShowPreferencesComponent } from './Components/Pages/Collocation/Preferences/show-preferences/show-preferences.component';
import { UpdateRequestComponent } from './Components/Pages/Collocation/update-request/update-request.component';
import { DeleteRequestComponent } from './Components/Pages/Collocation/delete-request/delete-request.component';
import { MyOffersComponent } from './my-offers/my-offers.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { SharedModule } from './shared/shared.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { UpdateprefrencesComponent } from './Components/Pages/Collocation/Preferences/updateprefrences/updateprefrences.component';
import { SearchCollocationComponent } from './Components/Pages/Collocation/offer/search-collocation/search-collocation.component';
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { HeaderComponent } from './FrontOffice/header/header.component';
import { AddRegistrationComponent } from './Components/Pages/Registration/add-registration/add-registration.component';
import { AllRegistrationComponent } from './Components/Pages/Registration/all-registration/all-registration.component';
import { UpdateRegistrationComponent } from './Components/Pages/Registration/update-registration/update-registration.component';
import { DetailsRegistrationComponent } from './Components/Pages/Registration/details-registration/details-registration.component';
import { AddSubscriptionComponent } from './Components/Subscription/add-subscription/add-subscription.component';
import { ListSubscriptionComponent } from './Components/Subscription/list-subscription/list-subscription/list-subscription.component';
import { EditSubscriptionComponent } from './Components/Subscription/edit-subscription/edit-subscription.component';
import { DeleteSubscriptionComponent } from './Components/Subscription/delete-subscription/delete-subscription.component';
import { FrontSubscriptionComponent } from './front-subscription/front-subscription.component';
import { PaymentComponent } from './payment/payment.component';
import { WalletComponent } from './wallet/wallet.component';
import { ScheduleModule } from './schedule/schedule.module';
import {TagDialogComponent} from "./Components/Pages/Forum/tag-dialog/tag-dialog.component";
import {WaitingDialogComponent} from "./Components/Pages/Forum/waiting-dialog/waiting-dialog.component";
import {PostDialogComponent} from "./Components/Pages/Forum/post-dialog/post-dialog.component";
import {PostDetailComponent} from "./Components/Pages/Forum/post-detail/post-detail.component";
import {MessageComponent} from "./Components/Pages/Forum/message/message.component";
import {ErrorPageComponent} from "./Components/Pages/Forum/error-page/error-page.component";
import {PostComponent} from "./Components/Pages/Forum/post/post.component";
import {PostLikeDialogComponent} from "./Components/Pages/Forum/post-like-dialog/post-like-dialog.component";
import {PostShareDialogComponent} from "./Components/Pages/Forum/post-share-dialog/post-share-dialog.component";
import {PostCommentDialogComponent} from "./Components/Pages/Forum/post-comment-dialog/post-comment-dialog.component";
import {CommentLikeDialogComponent} from "./Components/Pages/Forum/comment-like-dialog/comment-like-dialog.component";
import {ConfirmationDialogComponent} from "./Components/Pages/Forum/confirmation-dialog/confirmation-dialog.component";
import {
  ShareConfirmDialogComponent
} from "./Components/Pages/Forum/share-confirm-dialog/share-confirm-dialog.component";
import {SnackbarComponent} from "./Components/Pages/Forum/snackbar/snackbar.component";
import {
  FollowingFollowerListDialogComponent
} from "./Components/Pages/Forum/following-follower-list-dialog/following-follower-list-dialog.component";
import { TimelineComponent } from './Components/Pages/Forum/timeline/TimelineComponent';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import { ProfileUserComponent } from './Components/Pages/User/profile-user/profile-user.component';
import { SearchDialogComponent } from './Components/Pages/User/search-dialog/search-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FootorComponent,
    TemplateFrontComponent,
    FooterBackComponent,
    TemplateBackComponent,
    HeadBackComponent,
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
    AdvanceFilterComponent,
    CustomizerComponent,
    TransferPointsComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    UpdateUserInfoComponentComponent,
    DeleteUserComponent,
    UpdatePhotoProfileComponent,
    UpdateCoverPhotoProfileComponent,
    UpdatePasswordComponent,
    ShowPhotoProfileComponent,
    PhotoUploadDialogComponent,
    AdminUsersComponent,
    UserDetailsDialogComponent,
    AdminProfileComponent,
    UpdateFeedbackComponent,
    ShowRequestComponent,
    AddFeedbackComponent,
    ShowFeedbackComponent,
    ShowDetailsFeedbackComponent,
    AddRequestComponent,
    AddCollocationComponent,
    ShowCollocationComponent,
    UpdateCollocationComponent,
    DeleteCollocationComponent,
    ShowDetailsCollocatinComponent,
    AddPreferencesComponent,
    ShowPreferencesComponent,
    UpdateprefrencesComponent,
    UpdateRequestComponent,
    DeleteRequestComponent,
    MyOffersComponent,
    MyOfferComponent,
    ViewPhotoDialogComponent,
    SearchCollocationComponent,
    AddRegistrationComponent,
    AllRegistrationComponent,
    UpdateRegistrationComponent,
    DetailsRegistrationComponent,
    AddSubscriptionComponent ,
    ListSubscriptionComponent,
    EditSubscriptionComponent,
    DeleteSubscriptionComponent,
    FrontSubscriptionComponent,
    PaymentComponent,
    WalletComponent,
      ///////
    TagDialogComponent,
    WaitingDialogComponent,
    PostDialogComponent,
    PostDetailComponent,
    MessageComponent,
    ErrorPageComponent,
    PostComponent,
    PostLikeDialogComponent,
    PostShareDialogComponent,
    PostCommentDialogComponent,
    CommentLikeDialogComponent,
    ConfirmationDialogComponent,
    ShareConfirmDialogComponent,
    SnackbarComponent,
    FollowingFollowerListDialogComponent,
    TimelineComponent,
    ProfileUserComponent,
    SearchDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
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
    NgxDropzoneModule,
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
    BrowserAnimationsModule,
    MatLegacyChipsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
