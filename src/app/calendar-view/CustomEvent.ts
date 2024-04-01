import { CalendarEvent, CalendarEventAction } from "angular-calendar";    
import { EventColor } from "calendar-utils"; 
import { ScheduleService } from "../Services/Collocation/schedule.service"; 
import { parseISO } from 'date-fns'; 
import { DateTime } from 'luxon';



export class CustomEvent implements CalendarEvent {
    id?: number;
    start: Date;
    end: Date;
    title: string; 
    Requester?:string;  
    qrCodeOfferer:  string ;
    qrCodeRequester:  string

    Offerer?:string ; 
    color?: EventColor;
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: any;
    idUser=1 ; 
    constructor(eventData: CalendarEvent, private scheduleService: ScheduleService) {
        this.id = eventData.id;
        this.start = eventData.start; 

        if (eventData.end !== undefined) {
            this.end = eventData.end;
        } else {
            // Provide a default value or handle the case accordingly
            this.end = new Date(); // For example, you can assign the current date
        }
        this.title = eventData.title; 
        this.Requester= eventData.requester ;  
        this.Offerer= eventData.offerer ;   
        this.qrCodeOfferer = eventData.qrCodeOfferer; 
        this.qrCodeRequester=eventData.qrCodeRequester ; 
                  
        this.color = eventData.color;
        this.actions = eventData.actions;
        this.allDay = eventData.allDay;
        this.cssClass = eventData.cssClass;
        this.resizable = eventData.resizable;
        this.draggable = eventData.draggable;
        this.meta = eventData.meta; 
    }  

    addEvent(event: CalendarEvent): void {
        // Convert start time to the format expected by the timepicker
        const startDateTime = DateTime.fromJSDate(event.start);
      
        // Convert end time to the format expected by the timepicker if it's defined
        let formattedEndTime: string | undefined;
        if (event.end) {
          const endDateTime = DateTime.fromJSDate(event.end);
          formattedEndTime = endDateTime.toFormat('hh:mm a'); // Convert to format '12:00 PM'
        }
      
        // Convert start time to the format expected by the timepicker
        const formattedStartTime = startDateTime.toFormat('hh:mm a'); // Convert to format '12:00 PM'
      
        // Combine the date and time strings to create new JS Date objects for start and end times
        const startDateWithTime = new Date(startDateTime.toISODate() + 'T' + formattedStartTime);
        const endDateWithTime = formattedEndTime ? new Date(startDateTime.toISODate() + 'T' + formattedEndTime) : undefined;
      
        // Update the event start and end properties with the new Date objects
        event.start = startDateWithTime;
        event.end = endDateWithTime; 
        
      
        // Now you can call your service method to save the event
        this.scheduleService.createEventForUser(this.idUser,event).subscribe(
          (savedEvent: CalendarEvent) => {
            console.log('Event saved successfully:', savedEvent);
            event.id = savedEvent.id;
          },
          (error: any) => {
            console.error('Error saving event:', error);
          }
        );
      }
          
      toCalendarEvent(): CalendarEvent {
        // Convert start and end properties to JavaScript date objects
        const startDate = new Date(this.start);
        const endDate = new Date(this.end); 
        console.log(  this.qrCodeOfferer) ; 
    
        return {
            id: this.id,
            start: startDate,
            end: endDate,
            title: this.title, 
            requester:this.Requester, 
            offerer:this.Offerer,   
            qrCodeOfferer:this.qrCodeOfferer,  
            qrCodeRequester:this.qrCodeRequester,  
            
            color: this.color,
            actions: this.actions,
            draggable: this.draggable,
            resizable: this.resizable,
            meta: this.meta,
        };
    }        
}