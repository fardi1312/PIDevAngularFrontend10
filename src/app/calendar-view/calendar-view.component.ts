import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, Inject } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarEventTimesChangedEventType, CalendarView } from 'angular-calendar';
import { Observable, Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from '../Services/Collocation/schedule.service';
import { CustomEvent } from './CustomEvent';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { addHours, isSameDay, isSameMonth } from 'date-fns';
import { ExternalEventService } from '../Services/Collocation/external-event.service';
import { ExternalEvent } from '../Model/Collocation/ExternalEvent';
import { MatDialogRef } from '@angular/material/dialog';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { RoomDetails } from '../Model/Collocation/RoomDetails';
import { CollocationOffer, FurnitureCollocation, Gender } from '../Model/Collocation/CollocationOffer';
import { CollocationRequest } from '../Model/Collocation/CollocationRequest';
import { OfferService } from '../Services/Collocation/offer.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'], 
  styles: [
    `
      .drag-active {
        position: relative;
        z-index: 1;
        pointer-events: none;
      }
      .drag-over {
        background-color: #eee;
      }
    `,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent implements OnInit {
  externalEvents: CalendarEvent[] = []; 
  warningModal!: NgbModalRef;
  collocationOffer: CollocationOffer = {
    idCollocationOffer: 0, 
    averageRating:0, 
    location: '',
    houseType: 0,
    availablePlaces: 0,
    dateRent: new Date(),
    dateOffer: new Date(),
    gender: Gender.MALE,
    price: 0,
    furnitureCollocation: FurnitureCollocation.Furnitured,
    descriptionCollocation: '',
    imageCollocation: '',
    roomDetailsList: [] , 
  }   


  idUser =1; 
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
    private offerService:OfferService,
    private externalEventService: ExternalEventService, 
    private modalService: NgbModal, 
    private modal: NgbModal,
    private scheduleService: ScheduleService,
    private dialog: MatDialog, 

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {  

  }


  ngOnInit(): void {
    this.fetchSchedules(); 

  } 

  
  fetchSchedules(): void {
    console.log("fetch initialized");
    this.scheduleService.getAllEventsByUser(this.idUser).subscribe(schedules => {   
      // Filter events based on the condition
      const filteredSchedules = schedules.filter(schedule => {
        // Check if the user is an offerer or requester
        const userType = this.offererOrRequester(schedule);
        // Return false if user is the requester and event's fixedOfferer is false
        if (userType === 1 && !schedule.fixedOfferer) {
          return false;
        }
        return true;
      });
      
      this.schedules = filteredSchedules.map(schedule => new CustomEvent(schedule, this.scheduleService));
      
      // Convert custom events to calendar events
      this.events = this.schedules.map(schedule => {
        const calendarEvent = schedule.toCalendarEvent();
        return calendarEvent;
      });
      
      this.refresh.next();
    });
  }
    offererOrRequester(event : CalendarEvent) : number { 
    if (this.idUser == event.idOfferer)  
      return 0 ;  
    else if (this.idUser == event.idRequester) { 
      return  1 
    }
    else { 
      return - 1 ; 
    }
    
  }  
  isEditable(event:CalendarEvent):boolean { 
    if (this.offererOrRequester(event) == 0 && event.fixedOfferer == true && event.fixedRequester!=false) {  
        return false ; 
    } 
    else if (this.offererOrRequester(event) == 1 ) { 
      return false ; 
    } 
      return true ; 
     
    
  }   

  acceptRenter(event: CalendarEvent):void {    
    this.offerService.getCollocationOfferById(event.collocationOfferId).subscribe(
      (offer: CollocationOffer) => {
        
        this.collocationOffer = offer;
      },
      (error: any) => {
        // Handle errors that occur during retrieval
        console.error('Error retrieving collocation offer:', error);
      } 
    );
    console.log(event.collocationOfferId) ; 
  this.scheduleService.acceptRenter( event).subscribe(
    (updatedEvent: CalendarEvent) => { 
      this.refresh.next() ; 

      console.log('Event updated successfully:', updatedEvent);   
      const contractData = this.generateContract(this.collocationOffer);
      this.saveContractAsPDF(contractData);  

      this.fetchSchedules() ; 

      this.modal.dismissAll();  
      alert("Congratulations on finding the perfect Roomie !!!!!") 
      if (event.acceptRenting == true) {
      this.fetchSchedules() ; 
      }
    }, 
    (error: any) => {
      console.error('Error updating event:', error);
    }
  );
}  
refuseRenting(event:CalendarEvent):void {  
  const redirectUrl = 'http://localhost:4200/Collocation/addFeedback/' + event.collocationOfferId;  
  const confirmation = confirm(`Are you sure you want to refuse the renting? Click OK to proceed.`);
  if (confirmation) {  
    window.location.href = redirectUrl;
    this.deleteEvent(event) ; 
    alert(`You have refused the renting. You can view more details at: ${redirectUrl}`);
  }


}

acceptRenting (event:CalendarEvent):void {    

  this.scheduleService.acceptRenting(event).subscribe(
    (updatedEvent: CalendarEvent) => {
      console.log('Event updated successfully:', updatedEvent);
      this.modal.dismissAll(); 
      alert("Congratulations on finding the perfect Roomie !!!!!");  
      const contractData = this.generateContract(this.collocationOffer);
      this.saveContractAsPDF(contractData);  
      if (event.acceptRenter == true) {
        this.fetchSchedules(); 
        }
    },
    (error: any) => {
      console.error('Error updating event:', error);
    }
  );
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


      idOfferer: 0,
      collocationOfferId: 0,  
      QrCodeOfferer:'sdsdfsfsfsdfsdfsdfsdf' ,  
      QrCodeRequester:'sdfsdfsdfsdfsfdsf',
      idRequester: 0,
      start: currentDateTime,
      end: oneHourLaterDateTime, 
      idCollocationRequest: 0, 
      fixedOfferer: false,
      fixedRequester: false,
      offerer: '',
      requester: '',
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
      actions: this.actions,
      meta: { id: this.schedules.length + 1 }, 
      acceptRenter : false, 
      acceptRenting : false     
    };
  
    this.saveEvent(newEvent); // Save the newly added event
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
  refuseRenter(event:CalendarEvent) : void {  
    const confirmation = confirm(`Are you sure you want to refuse the renting? Click OK to proceed.`);
    if (confirmation) {   
      this.deleteEvent(event) ; 
    } 

  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  } 
  accept(event: CalendarEvent): void {    
    event.fixedRequester = true; 
    this.scheduleService.updateEventForUser(this.idUser, event).subscribe(
      async (updatedEvent: CalendarEvent) => {
        try {
          console.log('Event updated successfully:', updatedEvent);  
          this.modal.dismissAll();
        } catch (error) {
          console.error('Error sending email:', error);
        }
      },
      (error: any) => {
        console.error('Error updating event:', error);
      }
    );
  }  
  
refuse(event:CalendarEvent):void {   
  event.fixedRequester = false ;  
  event.draggable= true, 
  event.resizable = { 
    beforeStart:true , 
    afterEnd:true 
  }   
  this.scheduleService.updateEventForUser(this.idUser, event).subscribe(
    (updatedEvent: CalendarEvent) => {
      console.log('Event updated successfully:', updatedEvent);
      this.modal.dismissAll();
    },
    (error: any) => {
      console.error('Error updating event:', error);
    }
  );

} 
isCurrentDateSuperior(event:CalendarEvent): boolean {
  const currentDate = new Date(); 
  if(event){
  return currentDate > event.start;
}
  else 
    return false ; 

}



fix(event: CalendarEvent): void {
  const currentTime = new Date();
  const oneHourLater = new Date(currentTime.getTime() + (1 * 60 * 60 * 1000)); // Add one hour to the current time

  // Check if the event's start time is later than the current time by at least an hour
     /* if (new Date(event.start) > oneHourLater) */  {
    event.fixedOfferer = true; 
    event.fixedRequester = null ; 
    event.draggable = false;
    event.resizable = {
      beforeStart: false,
      afterEnd: false
    };
 
    this.scheduleService.updateEventForUser(this.idUser, event).subscribe(
      async (updatedEvent: CalendarEvent) => { // Mark the callback function as async
        console.log('Event updated successfully:', updatedEvent); 
        try {
          console.log('sending mail'); 
          await this.scheduleService.sendMail(event).toPromise(); // await inside async function

          this.modal.dismissAll();
        } catch (error) {
          console.error('Error sending email:', error);
        }
      },
      (error: any) => {
        console.error('Error updating event:', error);
      }
    );
  }/*   else { 
    alert("please select a Time at least an hour from now") ; 
  }   */
}
  
saveAndClose(event: CalendarEvent): void {
  this.scheduleService.updateEventForUser(this.idUser, event).subscribe(
    (updatedEvent: CalendarEvent) => {
      console.log('Event updated successfully:', updatedEvent);
      this.modal.dismissAll();
    },
    (error: any) => {
      console.error('Error updating event:', error);
      // Optionally handle the error, e.g., display an error message to the user
    }
  );
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

    if (isExternalEvent) { // Handle external event
      const externalIndex = this.externalEvents.indexOf(event);
      if (externalIndex > -1) {
        this.externalEvents.splice(externalIndex, 1);
        this.events.push(event);
      } 
      event.start = newStart;
      if (newEnd) {
        event.end = newEnd;
      }
  
    } else { 
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

    event.start = newStart;
    if (newEnd) {
      event.end = newEnd;
    }
    if (this.view === 'month') {
      this.viewDate = newStart;
      this.activeDayIsOpen = true;
    }
    this.events = [...this.events];

    this.saveEvent(event);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    const isExternalEvent = this.isExternalEvent(event); // Check if it's an external event
    if (isExternalEvent) { 
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
  getQrCodeOfferer(event : CalendarEvent) { 
    return event.QrCodeOfferer.toString() ; 
  }

  isExternalEvent(event: CalendarEvent): boolean {
    return this.externalEvents.includes(event);
  }

  externalDrop(event: CalendarEvent) {
    console.log("External drop initialized");
    console.log("External event:", event);
    
    if (!this.events.includes(event)) {
      console.log("Adding external event to the calendar:", event);
      this.externalEvents = this.externalEvents.filter((iEvent) => iEvent !== event);
      this.events.push(event);
      // Save the event after dropping it
      this.saveEvent(event);
      console.log("External event added to the calendar.");
    } else {
      console.log("External event already exists on the calendar.");
    }
  }

  generateContract(offer: CollocationOffer): string {
    // Check if request.date is a Date object before calling toDateString
    const rentDate: string = offer.dateRent.toString();
    const priceToPay: number = offer.price; 
    const place: string = offer.location; 
    const clientName: number = this.idUser;  
    const serviceDescription: string = offer.descriptionCollocation; 

    const contractContent = `
        Contract
        --------
        
        This contract is made between ${clientName} and the service provider.
        
        
        Rent Date: ${rentDate}
        Location: ${place}
        Price to Pay: ${priceToPay}
        Service Description: ${serviceDescription}  
        

        Terms:
        - Service Description:
          The service provider agrees to provide ${serviceDescription} starting from ${rentDate}.
        - Payment Terms:
          The client agrees to pay ${priceToPay} for the service provided on a payment frequency basis.
        - Termination:
          Either party may terminate this contract with a month written notice to the other party.
        - Governing Law:
          This contract shall be governed by and construed in accordance with the laws of Collocation. 




         Co&Co all rights are reserved
    `;

    return contractContent;
}

  async saveContractAsPDF(contractData: string): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(contractData, {
      x: 50,
      y: page.getHeight() - 100,
      size: 12,
      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'contract.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  }
  
}  