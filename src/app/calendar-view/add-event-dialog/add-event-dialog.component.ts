import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addHours } from 'date-fns';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent {
  eventTitle: string = ''; // Input field for event title
  startTime: Date = new Date(); // Input field for event start time
  endTime: Date = new Date(); // Input field for event end time

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.startTime = data.startTime; 
    this.endTime = addHours(this.startTime, 1); // Set endTime to startTime + 1 hour
  }
  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }

  onSaveClick(): void {
    const newEvent = {
      title: this.eventTitle,
      start: this.startTime,
      end: this.endTime
    }; 
    

    this.dialogRef.close(newEvent);
  }
}
