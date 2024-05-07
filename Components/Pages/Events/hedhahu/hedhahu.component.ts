import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/servicesM/events.service';
import { Events } from 'src/app/models/modelM/Events';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ShowEventsComponent } from '../show-events/show-events.component';
import { MatDialog } from '@angular/material/dialog';
import { Comment } from 'src/app/models/modelM/Comment';

@Component({
  selector: 'app-hedhahu',
  templateUrl: './hedhahu.component.html',
  styleUrls: ['./hedhahu.component.css']
})
export class HedhahuComponent implements OnInit {
  events: Events[] = [];
  filteredEvents: Events[] = [];
  paginatedEvents: Events[] = [];
  comments: Comment[] = [];
  
  categories: string[] = ['All', 'Charity', 'Entertainment', 'Educational', 'Community', 'Sports', 'Art', 'Cultural'];
  selectedCategory: string = 'All';
  eventLikesMap: { [key: number]: number } = {};
  
  pageIndex: number = 0;
  pageSize: number = 6;
  likeStatus: number[] = [];

  constructor(public eventsService: EventsService,  private snackBar: MatSnackBar, private dialogRef : MatDialog) {}

  ngOnInit(): void {
    this.fetchEvents();


  }

  fetchEvents(): void {
    this.eventsService.getAllActifEvents().subscribe((events: Events[]) => {
      this.events = events;
      this.filterEvents(this.selectedCategory);
      
      this.paginateEvents();
        this.getLikeStatuses();
     
    });
  }
  getLikeStatuses(): void {
    this.likeStatus = []; // Reset likeStatus array
    this.paginatedEvents.forEach((event, index) => {
        this.islikedOrnot(454, event.eventID!, index+1);
       
    });
}
islikedOrnot(userId: number, eventId: number, index: number): void {
  this.eventsService.islikedOrnot(userId, eventId).subscribe(
      (status: number) => {
     
          this.likeStatus[index] = status; 
  
      },
      error => {
          console.error('Error checking like status', error);
      }
  );
}

  filterEvents(selectedCategory:string): void {
    console.log('Filtering events with category:', this.selectedCategory);

    const selectedCategoryNormalized = this.selectedCategory.trim().toLowerCase();
    

    this.filteredEvents = this.selectedCategory === 'All'
        ? this.events
        : this.events.filter(event => {
            
            const eventCategoryNormalized = event.category?.trim().toLowerCase() ?? '';

            return eventCategoryNormalized === selectedCategoryNormalized;
        });
    
    console.log('Filtered events:', this.filteredEvents);
    
    this.paginateEvents();
}

paginateEvents(): void {
    console.log('Paginating events');
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
    console.log('Paginated events:', this.paginatedEvents);
}

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateEvents();
  }

  resetCategory(): void {
    this.selectedCategory = 'All';
    this.filterEvents(this.selectedCategory); // Update the filtered events and pagination
  }

  getEventById(eventId: number): void {
    console.log("id",eventId) 
    this.dialogRef.open(ShowEventsComponent,{
      height: '800px',
      width: '800px',
      data : {
        eventId : eventId     }
    });
    this.eventsService.getEventById(eventId).subscribe(
      () => {
        console.log('Successfully participated in event.');
    
        this.fetchEvents();
      },
      error => {
        console.error('Error participating in event:', error);       
      }
    ); 
  }

  






  addLike(userId: number, eventId: number): void {
    this.eventsService.addLike(userId, eventId).subscribe(
      () => {
        console.log('Like added or removed successfully');
        // Update UI as needed, but typically you would refresh the events list
        this.fetchEvents(); // For example, reload events after a like is added or removed
      },
      error => {
        console.error('Error adding or removing like:', error);
      }
    );
  }
  



}

