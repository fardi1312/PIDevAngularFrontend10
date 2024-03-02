import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TemplateFrontComponent } from './FrontOffice/template-front/template-front.component';
import { TemplateBackComponent } from './BackOffice/template-back/template-back.component';


const routes: Routes = [
  {path:"admin",component:TemplateBackComponent},


    {path:"",component:TemplateFrontComponent},


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
