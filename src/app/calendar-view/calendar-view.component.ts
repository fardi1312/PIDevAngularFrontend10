import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarUtils, CalendarView } from 'angular-calendar';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { ScheduleService } from '../Services/Collocation/schedule.service'; // Replace with the actual path
import { Schedule } from '../Model/Collocation/Schedule';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];
  activeDayIsOpen = false;
  modalData: { action: string; event: CalendarEvent } | undefined;

  constructor(
    private calendarUtils: CalendarUtils,
    private scheduleService: ScheduleService // Inject your service here
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    // Call your service method to get schedule data
    this.scheduleService.getAllSchedulers().subscribe((schedules) => {
      // Assuming your ScheduleService returns data in a format compatible with CalendarEvent
      this.events = schedules.map((schedule) => {
        return {
          title: schedule.title,
          start: new Date(schedule.startTime),
          end: new Date(schedule.endTime),
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        } as CalendarEvent;
      });
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  } 
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
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];



  refresh: Subject<void> = new Subject<void>();

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !isSameDay(this.viewDate, date) || events.length > 0;
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => (iEvent === event ? { ...event, start: newStart, end: newEnd } : iEvent));
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { action, event };
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}
