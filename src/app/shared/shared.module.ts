import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template/template.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { MatMenuModule } from '@angular/material/menu'; // Add this import

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    TemplateComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    MatIconModule, // Include MatIconModule here
    MatMenuModule // Include MatMenuModule here
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TemplateComponent
  ]
})
export class SharedModule { }
