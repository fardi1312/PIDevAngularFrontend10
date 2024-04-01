import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module'; 
import { TemplateFrontComponent } from '../FrontOffice/template-front/template-front.component';
import {  FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app.routing.module';  
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';  
import { AddEventDialogComponent } from '../calendar-view/add-event-dialog/add-event-dialog.component'; 
import { MatDialogModule,MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'; 
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



const routes: Routes = [
  { path: '', component: TemplateFrontComponent },
  { path: 'calendar', component: CalendarViewComponent },
];

@NgModule({
  declarations: [CalendarViewComponent,AddEventDialogComponent],
  imports: [SharedModule,
    

    RouterModule, 
    CommonModule,  
    MatDialogModule, 
    NgbModalModule,  
    
    NgxMaterialTimepickerModule, 
    FormsModule,    
    FlatpickrModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule, 
    RouterModule.forChild(routes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarViewComponent],
  providers: [
    CalendarUtils,
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  })
export class ScheduleModule {}