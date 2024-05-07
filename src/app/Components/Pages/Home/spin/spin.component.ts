import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-spin',
  templateUrl: './spin.component.html',
  styleUrls: ['./spin.component.css']
})
export class SpinComponent {
  rotationDegrees: number = 0;
  numberOfSlices: number = 8; // Number of slices in the wheel
  sliceContents: string[] = ["Anothor Time", "1", "5", "2", "15", "Anothor Time", "20", "Anothor Chance"];
  selectedSliceContent: string = "";
  constructor(private http: HttpClient, private carpoolingService: CarpoolingService ) {

  }
  showModal = false;
  spinUsed = false;
  showModal1 = true;

  
  
  close(){
    this.showModal1=false;
  }
  
  alertShown = false;

  userId:number=1;

  spin() {
    if (this.spinUsed) {
      return; // Exit early if spin has already been used
    }
  
    const randomDegrees = Math.ceil(Math.random() * 1000);
    console.log('Random number:', randomDegrees);
  
    this.rotationDegrees += randomDegrees % 360;
    console.log('Total degrees:', this.rotationDegrees);
  
    const sliceSize = 360 / this.numberOfSlices;
    const selectedSliceIndex = Math.floor((360 - this.rotationDegrees % 360) / sliceSize);
    const selectedSliceContent = this.sliceContents[selectedSliceIndex];
    console.log('Selected slice content:', selectedSliceContent);
  
    setTimeout(() => {
      this.selectedSliceContent = selectedSliceContent;
      if (['1', '2', '5', '15', '20'].includes(selectedSliceContent)) {
        alert(`Congrats! You got ${selectedSliceContent} points.`);
        this.spinUsed = true; // Prevent further spins
        this.showModal = false;
        this.carpoolingService.updatePointFidelite(this.userId, parseInt(selectedSliceContent, 10)).subscribe(
          (response) => {
            console.log('Points de fidelte  updated successfully:', response);
          },
          (error) => {
            console.error('Error updating points:', error);
          }
        );
      } else if (selectedSliceContent === 'Anothor Time' && !this.alertShown) {
        this.alertShown = true;
        if (confirm('Sorry, try again for this time. Click "OK" to close.')) {
          this.spinUsed = true; // Prevent further spins
          this.alertShown = false; // Reset the flag
          this.showModal = false;
          return;
        }
      } else if (selectedSliceContent === 'Anothor Chance') {
        alert('Another Chance.');
        this.spin();
      }
  
      // Close the modal after spinning
    }, 2000);
  
    const arrow = document.querySelector('.arrow') as HTMLElement;
    arrow.style.transform = `rotate(${this.rotationDegrees}deg)`;
  }
  
  
  
  
}
  
  
  
  
  



