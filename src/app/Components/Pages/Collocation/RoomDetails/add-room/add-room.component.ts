import { Component } from '@angular/core';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  roomDescriptions: string[] = [];
  steps: number[] = [];

  ngOnInit() {
    this.steps = Array(this.roomDescriptions.length).fill(0).map((x, i) => i);
  }
}
