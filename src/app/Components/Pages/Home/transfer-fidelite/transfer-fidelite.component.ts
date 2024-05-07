import { Component } from '@angular/core';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';

@Component({
  selector: 'app-transfer-fidelite',
  templateUrl: './transfer-fidelite.component.html',
  styleUrls: ['./transfer-fidelite.component.css']
})
export class TransferFideliteComponent {
  constructor(private carpoolingService: CarpoolingService) {}

  showFidelite1:Boolean=false;
  userid:number=1;
  closeQuestionModal(){
    this.showFidelite1=false;}

    selectedPoints: number = 0;

    pointFidelite: number = 0;

    setSelectedPoints(points: number, pointFidelite: number): void {
      this.selectedPoints = points;
      this.pointFidelite = pointFidelite;
      this.transferPoints();

    }
    
    transferPoints(): void {
      if (this.selectedPoints > 0) {
        console.log("pointFidelite:", this.pointFidelite);
        console.log("selectedPoints:", this.selectedPoints);
        
        this.carpoolingService.convertPoints(this.userid, this.pointFidelite, this.selectedPoints) 
          .subscribe(updatedPointCount => {
            console.log('Updated point count:', updatedPointCount);
            alert('You just got ' + this.selectedPoints + ' points!');
          }, error => {
            console.error('Error updating point count:', error);
            alert('Insufficient loyalty points!');
            // Handle the error
          });
      }
    }
    
    
    
    
    
    
    
}
