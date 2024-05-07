import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  options: string[] = [];
  assignee: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AssignComponent>,
  ) {
    if (data && data.humanResourcesEmails) {
      const humanResourcesEmails = data.humanResourcesEmails;
      console.log(humanResourcesEmails);
      this.options = humanResourcesEmails;
    }
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close(); 
    console.log(this.assignee)

  }

  onSaveClick(): void {
    const newApplication = { 
      assignee:this.assignee  
    }; 
    console.log(this.assignee)
    this.dialogRef.close(newApplication);
  }

  }
