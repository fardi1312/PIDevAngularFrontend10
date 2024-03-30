import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { LoginComponent } from './Components/Pages/User/login/login.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { ProfileComponent } from './Components/Pages/User/profile/profile.component';
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
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';
import { AdminUsersComponent } from './Components/Pages/User/admin-users/admin-users.component';
import { AdminProfileComponent } from './Components/Pages/User/admin-profile/admin-profile.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },

  
  

  { 
    path: "admin", canActivate: [AuthGuard], 
    children: [
      {path: "dashboard", component: TemplateBackComponent, canActivate: [AuthGuard]}, 
      { path: "admin-users", component: AdminUsersComponent},
      { path: "admin-profile", component: AdminProfileComponent},
       ]
  },







  
  { 
    path: "user", 
    canActivate: [AuthGuard], 
    children: [
      { path: "client", component: TemplateFrontComponent },
      { path: "profile", component: ProfileComponent },
      { path: "updateuserinfo", component: UpdateUserInfoComponentComponent },
      { path: "deleteuser", component: DeleteUserComponent },
      { path: "updatephotoprofile", component: UpdatePhotoProfileComponent },
      { path: "updatecoverphotoprofile", component: UpdateCoverPhotoProfileComponent },
      { path: "showphotoprofile", component: ShowPhotoProfileComponent },
      { path: "photo-upload-dialog", component: PhotoUploadDialogComponent },
      { path: "view-photo-dialog", component: ViewPhotoDialogComponent },
      { path: "updatepassword", component: UpdatePasswordComponent },
    ]
  },


 


 








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
