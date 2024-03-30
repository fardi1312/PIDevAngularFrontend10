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
import { SubmitPropertyComponent } from './Components/Pages/Carpooling/submit-property/submit-property.component';
//import { CarpoolingAskComponent } from './Components/Pages/Carpooling/carpooling-ask/carpooling-ask.component';
import { AgentListComponent } from './Components/Pages/Carpooling/agent-list/agent-list.component';


const routes: Routes = [
  {path:"admin",component:TemplateBackComponent},


    {path:"",component:TemplateFrontComponent},
    { 
      path: 'Carpooling', 
      children: [
        { path: 'addC', component: SubmitPropertyComponent },
        { path: 'askC', component: AgentListComponent }
      
  
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
