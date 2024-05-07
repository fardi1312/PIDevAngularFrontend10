import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';//
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-join-component',
  templateUrl: './join-component.component.html',
  styleUrls: ['./join-component.component.css']
})
export class JoinComponent {  
  message: string = ''; 
  position : string ='' ;  
  positionOptions: string[] = ['Manager', 'Developer', 'Designer', 'Engineer','Human Resources'];


  constructor(public dialogRef: MatDialogRef<JoinComponent>
    
    ) { }

  onCancelClick(): void {
    this.dialogRef.close(); 
  }

  onSaveClick(): void {  
    const newApplication = {  
      message: this.message , 
      position: this.position

    }; 
     this.dialogRef.close(newApplication);
  }

  openModal(): void {
    /*
    const modalRef = this.ngbModal.open(JoinComponent);
    modalRef.componentInstance.message = this.message; // Pass data to the modal
    modalRef.componentInstance.position = this.position; // Pass position data to the modal
    modalRef.result.then((result) => {
      console.log('Modal closed with result:', result); 
    }).catch((reason) => {
      console.log('Modal dismissed with reason:', reason);
    });*/
  }
    }
