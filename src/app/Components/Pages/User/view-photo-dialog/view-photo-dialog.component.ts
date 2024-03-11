import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-photo-dialog',
  templateUrl: './view-photo-dialog.component.html',
  styleUrls: ['./view-photo-dialog.component.css']
})
export class ViewPhotoDialogComponent implements OnInit {
  dataUrl: string; 
  constructor(@Inject(MAT_DIALOG_DATA) public photoUrl: string) { 
    this.dataUrl = photoUrl; 
  }
  ngOnInit(): void {
  }
}
