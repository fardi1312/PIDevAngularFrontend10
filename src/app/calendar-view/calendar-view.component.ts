import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Inject } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarEventTimesChangedEventType, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from '../Services/Collocation/schedule.service';
import { CustomEvent } from './CustomEvent';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { addHours, isSameDay, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent implements OnInit {
  externalEvents: CalendarEvent[] =    [ {
    title: 'Event 1',
    start: new Date(),
    draggable: true,
  }]
; 
  idUser = 1;
  schedules: CustomEvent[] = [];
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  modalData?: { action: string; event: CalendarEvent<any> };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event);
      },
    },
  ];
  refresh: Subject<void> = new Subject<void>();
  events: CalendarEvent[] = [];
  clickedDate!: Date;
  activeDayIsOpen: boolean = true;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    private modal: NgbModal,
    private scheduleService: ScheduleService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.fetchSchedules();
  }

  fetchSchedules(): void { 
    console.log("fetch initialized") ;  
    this.scheduleService.getAllEventsByUser(this.idUser).subscribe(schedules => {
      this.schedules = schedules.map(schedule => new CustomEvent(schedule, this.scheduleService));
      this.events = this.schedules.map(schedule => {
        const calendarEvent = schedule.toCalendarEvent();
        calendarEvent.draggable = true; // Set draggable to true
        calendarEvent.resizable = {
          beforeStart: true,
          afterEnd: true
        }; // Set resizable to true
        return calendarEvent;
      });
      this.refresh.next(); 
    });
  }
  
  eventClicked({ event }: { event: CalendarEvent }): void {
    this.modalData = { action: 'Edit', event };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !isSameDay(this.viewDate, date) || events.length > 0;
      this.view = CalendarView.Day;
      this.viewDate = date;
    }
  }

/*   eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    if (newStart && newEnd) { // Check if newStart and newEnd are defined
      // Update the corresponding event in the events array
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...iEvent,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
  
      this.handleEvent('Dropped or resized', {
        ...event,
        start: newStart,
        end: newEnd,
      });
    }
  }
 */  
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  openAddEventDialog(date: Date): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: { startTime: date }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEvent(result);
      }
    });
  }

  addEvent(): void {
    const currentDateTime = new Date();
    const oneHourLaterDateTime = addHours(currentDateTime, 1);

    const newEvent: CalendarEvent = {
      id: this.events.length + 1,
      title: 'New event',
      start: currentDateTime,
      end: oneHourLaterDateTime,
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      actions: this.actions,
      meta: { id: this.schedules.length + 1 }
    };

    this.events = [...this.events, newEvent];
  }

  saveEvent(event: CalendarEvent): void {
    this.scheduleService.createEventForUser(this.idUser, event).subscribe(
      (savedEvent: CalendarEvent) => {
        console.log('Event saved successfully:', savedEvent);
        this.fetchSchedules();
      },
      (error: any) => {
        console.error('Error saving event:', error);
      }
    );
  }

  deleteEvent(event: CalendarEvent): void {
    const eventId = event.id;
    if (eventId !== undefined) {
      const eventIndex = this.events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        this.events.splice(eventIndex, 1);
        this.scheduleService.deleteEventForUser(eventId, this.idUser).subscribe(
          () => console.log('Event deleted successfully.'),
          (error) => console.error('Error deleting event:', error)
        );
      }
    }
    this.refresh.next();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  saveAndClose(event: CalendarEvent): void {
    this.saveEvent(event);
    this.modal.dismissAll();
  }

  deleteAndClose(event: CalendarEvent): void {
    this.deleteEvent(event);
    this.modal.dismissAll();
  }  
  eventDropped({
    event,
    newStart,
    newEnd,
    allDay,
  }: CalendarEventTimesChangedEvent): void {
    const isExternalEvent = this.isExternalEvent(event); // Check if it's an external event
    if (typeof allDay !== 'undefined') {
      event.allDay = allDay;
    }
    if (!isExternalEvent) { // Call eventTimesChanged if it's not an external event
      this.eventTimesChanged({ event, newStart, newEnd, type: CalendarEventTimesChangedEventType.Drag });
      return;
    }
      
    // Handle external drop if it's an external event
    const externalIndex = this.externalEvents.indexOf(event);
    if (externalIndex > -1) {
      this.externalEvents.splice(externalIndex, 1);
      this.events.push(event);
      // Save the event after dropping it
      this.saveEvent(event);
    }
    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];
  }
  
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    const isExternalEvent = this.isExternalEvent(event); // Check if it's an external event
    if (isExternalEvent) { // Do nothing if it's an external event
      return;
    }
    // Update the event if it's not an external event
    if (newStart && newEnd) {
      this.events = this.events.map((iEvent) => {
        if (iEvent === event) {
          return {
            ...iEvent,
            start: newStart,
            end: newEnd,
          };
        }
        return iEvent;
      });
  
      this.handleEvent('Dropped or resized', {
        ...event,
        start: newStart,
        end: newEnd,
      });
    }
  }
  
  isExternalEvent(event: CalendarEvent): boolean {
    return this.externalEvents.includes(event);
  }
  
  externalDrop(event: CalendarEvent) {
    console.log("external drop initialized");
    if (!this.events.includes(event)) {
      this.externalEvents = this.externalEvents.filter((iEvent) => iEvent !== event);
      this.events.push(event);
      // Save the event after dropping it
      this.saveEvent(event);
    }
  }
  
  

  
}
