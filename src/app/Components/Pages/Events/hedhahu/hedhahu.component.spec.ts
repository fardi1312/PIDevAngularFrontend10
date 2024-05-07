import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/servicesM/events.service';
import { Events } from 'src/app/models/modelM/Events';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-hedhahu',
  templateUrl: './hedhahu.component.html',
  styleUrls: ['./hedhahu.component.css']
})
export class HedhahuComponent implements OnInit {
  events: Events[] = [];
  filteredEvents: Events[] = [];
  paginatedEvents: Events[] = [];
  
  categories: string[] = ['All', 'Charity', 'Entertainment', 'Educational', 'Community', 'Sports', 'Art', 'Cultural'];
  selectedCategory: string = 'All';
  
  pageIndex: number = 0;
  pageSize: number = 6;

  constructor(public eventsService: EventsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.eventsService.getAllEvents().subscribe((events: Events[]) => {
      this.events = events;
      this.filterEvents();
    });
  }

  filterEvents(): void {
    const selectedCategoryNormalized = this.selectedCategory.trim().toLowerCase();
    
    this.filteredEvents = this.selectedCategory === 'All'
        ? this.events
        : this.events.filter(event => {
            const eventCategoryNormalized = event.category?.trim().toLowerCase() ?? '';
            return eventCategoryNormalized === selectedCategoryNormalized;
        });
    
    this.paginateEvents();
  }

  paginateEvents(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateEvents();
  }

  resetCategory(): void {
    this.selectedCategory = 'All';
    this.filterEvents();
  }

  participateEvent(eventId: number): void {
    console.log("zzz", eventId);
    this.eventsService.openModal(); // Open the modal
    this.eventsService.participate(eventId).subscribe(
      () => {
        console.log('Successfully participated in event.');
        this.snackBar.open('Successfully participated in event.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']          
        });
        this.fetchEvents(); // Update events after successful participation
      },
      error => {
        console.error('Error participating in event:', error);
        this.snackBar.open('Error participating in event. Please try again later.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}
