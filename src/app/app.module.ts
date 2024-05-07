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

import { FrontSubscriptionComponent } from './front-subscription/front-subscription.component';
import { PaymentComponent } from './payment/payment.component';

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
import { PostsTagsComponent } from './Components/Pages/Forum/posts-tags/posts-tags.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from "@progress/kendo-angular-charts";
import { UserstatComponent } from './Components/Pages/User/userstat/userstat.component';
import { AccountVerificationComponent } from './Components/Pages/User/account-verification/account-verification.component';
import { ForgotUpdPasswordComponent } from './Components/Pages/User/forgotupd-password/forgotupd-passwordcomponent';
import { UserActivitiesComponent } from './Components/Pages/User/user-activities/user-activities.component';
import { UserHelpsComponent } from './Components/Pages/User/user-helps/user-helps.component';
import { FavouritesComponent } from './Components/Pages/SMProfile/favourites/favourites.component';
import { Mycommandes } from './Components/Pages/SMProfile/Mycommandes/Mycommandes.component';
import { MenusmComponent } from './Components/Pages/SMProfile/menusm/menusm.component';
import { Mypost9achComponent } from './Components/Pages/SMProfile/MyPost9ach/Mypost9ach.component';
import { MyCarpoolingRequest } from './Components/Pages/SMProfile/MyCarpoolingRequest/MyCarpoolingRequest.component';
import { Editpost9achComponent } from './Components/Pages/Ecommerce/editpost9ach/editpost9ach.component';
import { CartHomeComponent } from './Components/Pages/Home/cart-home/cart-home.component';
import { QuizComponent } from './Components/Pages/Home/quiz/quiz.component';
import { SpinComponent } from './Components/Pages/Home/spin/spin.component';
import { HomeComponent } from './Components/Pages/Home/home/home.component';
import { BackOfficeQuizComponent } from './Components/Pages/Home/back-office-quiz/back-office-quiz.component';
import { TransferFideliteComponent } from './Components/Pages/Home/transfer-fidelite/transfer-fidelite.component';
import { CouponBackComponent } from './Components/Pages/Home/coupon-back/coupon-back.component';
import { AcceuilPostComponent } from './Components/Pages/Home/acceuil-post/acceuil-post.component';
import { MultiformsComponent } from './Components/Pages/Events/multiforms/multiforms.component';
import { ShowEventsComponent } from './Components/Pages/Events/show-events/show-events.component';
import { HedhahuComponent } from './Components/Pages/Events/hedhahu/hedhahu.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { RevenueChartComponent } from './Components/reports/revenue-chart/revenue-chart.component';
import { PropertySalesComponent } from './Components/reports/property-sales/property-sales.component';
import { IncomeAnalysisComponent } from './Components/reports/income-analysis/income-analysis.component';
import { RecentTranscationComponent } from './Components/reports/recent-transcation/recent-transcation.component';
import { SalesSummaryComponent } from './Components/reports/sales-summary/sales-summary.component';
import { StatSaifComponent } from './Components/Pages/Home/stat-saif/stat-saif.component';
import { PiechartComponent } from './Components/Pages/Home/piechart/piechart.component';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { ClubStat2Component } from './BackOffice/club-stat2/club-stat2.component';
import { ClubStat3Component } from './BackOffice/club-stat3/club-stat3.component';
import { ClubStatComponent } from './BackOffice/club-stat/club-stat.component';
import { MyClubComponent } from './Components/Pages/my-club/my-club.component';
import { ShowClubsComponent } from './Components/Pages/Club/show-clubs/show-clubs.component';
import { AddClubComponent } from './Components/Pages/Club/add-club/add-club.component';
import { AssignComponent } from './Components/Pages/Collocation/assign/assign.component';
import { JoinComponent } from './Components/Pages/Club/join-component/join.component';
import { ShowClubDetailsComponent } from './Components/Pages/Club/show-club-details/show-club-details.component';
import { Addpost9achComponent } from './Components/Pages/Ecommerce/addpost9ach/addpost9ach.component';
import { Post9achComponent } from './Components/Pages/Ecommerce/post9ach/post9ach.component';
import { CartDialogComponent } from './Components/Pages/Ecommerce/cart-dialog/cart-dialog.component';
import { StatChartComponent } from './Components/Pages/Home/stat-chart/stat-chart.component';
import { StatgouvComponent } from './Components/Pages/Home/statgouv/statgouv.component';
import { AddRegistrationComponent } from './Components/Pages/Registration/add-registration/add-registration.component';
import { AllRegistrationComponent } from './Components/Pages/Registration/all-registration/all-registration.component';
import { UpdateRegistrationComponent } from './Components/Pages/Registration/update-registration/update-registration.component';
import { DetailsRegistrationComponent } from './Components/Pages/Registration/details-registration/details-registration.component';
import { AddSubscriptionComponent } from './Components/Subscription/add-subscription/add-subscription.component';
import { ListSubscriptionComponent } from './Components/Subscription/list-subscription/list-subscription/list-subscription.component';
import { EditSubscriptionComponent } from './Components/Subscription/edit-subscription/edit-subscription.component';
import { DeleteSubscriptionComponent } from './Components/Subscription/delete-subscription/delete-subscription.component';
import { WalletComponent } from './wallet/wallet.component';
import { SettingsComponent } from './settings/settings.component';
import { MessageamiraComponent } from './message/messageamira.component';

@NgModule({
  declarations: [
    Post9achComponent,
    CartDialogComponent,
    Addpost9achComponent,
    ClubStat2Component,
    ClubStat3Component,
    ClubStatComponent,
    MyClubComponent,
    ShowClubsComponent,
    AddClubComponent,
    ShowClubDetailsComponent,

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
    AssignComponent,
    AddRequestComponent,
    JoinComponent,
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
    SearchDialogComponent,
    PostsTagsComponent,
    UserstatComponent,
    AccountVerificationComponent,
    ForgotUpdPasswordComponent,
    UserActivitiesComponent,
    UserHelpsComponent,
    FavouritesComponent,
    Mycommandes,
    MenusmComponent,
    Mypost9achComponent,
    MyCarpoolingRequest,

    Editpost9achComponent,
    CartHomeComponent,
    QuizComponent,
    SpinComponent,
    HomeComponent,
    BackOfficeQuizComponent,
    TransferFideliteComponent,
    CouponBackComponent,
    AcceuilPostComponent,
    MultiformsComponent,
    ShowEventsComponent,
    HedhahuComponent,
    ReportsComponent,
    RevenueChartComponent,
    PropertySalesComponent,
    IncomeAnalysisComponent,
    RecentTranscationComponent,
    SalesSummaryComponent,
    StatSaifComponent,
    PiechartComponent,
    StatChartComponent,
    StatgouvComponent,
    SettingsComponent,
    MessageamiraComponent

  ],
  imports: [
    BrowserModule,
    //NgbModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
  
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
  
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule,
  
    MatRippleModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,

    MatNativeDateModule,
    NgxDropzoneModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDaterangepickerMd.forRoot(),
    MatFormFieldModule,

     RouterModule,
    FormsModule,
   
  

   MatLegacyChipsModule,
   NgApexchartsModule,
    ChartModule,
    NgxsModule,
    ToastrModule,
    MatStepperModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    ToastrModule.forRoot({
      // optional custom configuration

  }),
  NgxsModule.forRoot([]),









  NgApexchartsModule, 
 
 
  ReactiveFormsModule, 
  MatAutocompleteModule, 
  BrowserModule, 
  MatDatepickerModule, 
  MatDialogModule,
  MatNativeDateModule, 
 
  MatFormFieldModule,
  MatInputModule,
  AppRoutingModule,
  RouterModule,
  FormsModule,
  HttpClientModule,
  CommonModule,
  BrowserAnimationsModule,  
  ReactiveFormsModule ,

 
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  NgxDropzoneModule,
  MatDialogModule,
  BrowserAnimationsModule,
  FormsModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatButtonModule,
  MatStepperModule,
  MatFormFieldModule,
  MatIconModule ,
  ToastrModule.forRoot({
    // optional custom configuration
}),
NgxsModule.forRoot([]),
BrowserAnimationsModule,
NgxPaginationModule,
MatPaginatorModule,
MatTableModule,
MatSnackBarModule,
MatDialogModule,
MatTooltipModule,
NgApexchartsModule



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
