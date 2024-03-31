import { NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './FrontOffice/header/header.component';
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
import { ProfileComponent } from './Components/Pages/User/profile/profile.component';
import { UpdateUserInfoComponentComponent } from './Components/Pages/User/update-user-info-component/update-user-info-component.component';
import { DeleteUserComponent } from './Components/Pages/User/delete-user/delete-user.component';
import { UpdatePhotoProfileComponent } from './Components/Pages/User/update-photo-profile/update-photo-profile.component';
import { UpdateCoverPhotoProfileComponent } from './Components/Pages/User/update-cover-photo-profile/update-cover-photo-profile.component';
import { UpdatePasswordComponent } from './Components/Pages/User/update-password/update-password.component';
import { ShowPhotoProfileComponent } from './Components/Pages/User/show-photo-profile/show-photo-profile.component';
import { PhotoUploadDialogComponent } from './Components/Pages/User/photo-upload-dialog/photo-upload-dialog.component';
import { ViewPhotoDialogComponent } from './Components/Pages/User/view-photo-dialog/view-photo-dialog.component';
import { TokenInterceptor } from './token.interceptor';
import { AdminUsersComponent } from './Components/Pages/User/admin-users/admin-users.component';
import { UserDetailsDialogComponent } from './Components/Pages/User/user-details-dialog/user-details-dialog.component';
import { AdminProfileComponent } from './Components/Pages/User/admin-profile/admin-profile.component';
import { AppRoutingModule } from './app.routing.module';

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
    TransferPointsComponent,
    ViewPhotoDialogComponent
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
