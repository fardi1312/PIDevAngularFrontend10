import { CalendarEvent, CalendarEventAction } from "angular-calendar";    
import { EventColor } from "calendar-utils"; 
import { ScheduleService } from "../Services/Collocation/schedule.service"; 
import { parseISO } from 'date-fns'; 
import { DateTime } from "luxon";
import { CollocationOffer } from "../Model/Collocation/CollocationOffer";



export class CustomEvent implements CalendarEvent {
    id: number;
    start: Date;
    end: Date;
    title: string;  
    idOfferer:number ; 
    idRequester:number ;   
    acceptRenter: Boolean ; 
    acceptRenting: Boolean ; 
    collocationOfferId:number ; 
    offerer:string ; 
    color?: EventColor;   
    fixedOfferer:Boolean ;  
    idCollocationRequest:number ; 
    fixedRequester:Boolean | null; 
    requester:string ; 
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
        this.fixedOfferer=eventData.fixedOfferer ; 
        this.fixedRequester=eventData.fixedRequester ;    
        this.idOfferer = eventData.idOfferer ;
        this.idRequester = eventData.idRequester   ;
        this.idCollocationRequest = eventData.idCollocationRequest 
        this.collocationOfferId = eventData.collocationOfferId
        if (eventData.end !== undefined) {
            this.end = eventData.end;
        } else {
            // Provide a default value or handle the case accordingly
            this.end = new Date(); // For example, you can assign the current date
        }
        this.title = eventData.title; 
        this.requester= eventData.requester ;  
        this.offerer= eventData.offerer ;  
        this.acceptRenter = eventData.acceptRenter ; 
        this.acceptRenting = eventData.acceptRenting ;   
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
    
        return {
            id: this.id,  
            collocationOfferId:this.collocationOfferId, 
            start: startDate,
            end: endDate,
            title: this.title,  
            idCollocationRequest:this.idCollocationRequest, 
            offerer:this.offerer,   
            requester:this.requester,   
            fixedOfferer:this.fixedOfferer, 
            fixedRequester:this.fixedRequester,  
            color: this.color,
            actions: this.actions,
            draggable: this.draggable, 
            idOfferer:this.idOfferer ,  
            acceptRenter:this.acceptRenter , 
            acceptRenting:this.acceptRenting, 
            idRequester:this.idRequester ,  
            resizable: this.resizable,
            meta: this.meta,
        };
    }        
}
