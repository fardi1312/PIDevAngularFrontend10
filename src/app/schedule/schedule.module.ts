// schedule.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule, Routes } from '@angular/router';
import { CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module'; 
import { RecurrenceEditor, RecurrenceEditorModule, Schedule, ScheduleAllModule,DayService,WeekService,MonthService,MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { TemplateFrontComponent } from '../FrontOffice/template-front/template-front.component';

const routes: Routes = [
  { path: '', component: TemplateFrontComponent },
  { path: 'calendar', component: CalendarViewComponent },
];

@NgModule({
  declarations: [CalendarViewComponent],
  imports: [SharedModule,  
    ScheduleAllModule,RecurrenceEditorModule,
    CommonModule, 
    RouterModule, 
    RouterModule.forChild(routes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarViewComponent],
  providers: [CalendarUtils,DayService,WeekService,MonthService,MonthAgendaService],
})
export class ScheduleModule {}
