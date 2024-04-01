import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/Services/Collocation/feedback.service';
import { CollocationFedback } from 'src/app/models/Collocation/CollocationFeedback';

@Component({
  selector: 'app-show-feedback',
  templateUrl: './show-feedback.component.html',
  styleUrls: ['./show-feedback.component.css']
})
export class ShowFeedbackComponent implements OnInit { 
  feedbacks :CollocationFedback[] = [] ; 
  constructor(private feedbackService:FeedbackService,private router : Router){} 
  ngOnInit() { this.loadFeedback() ; 
    
  }  
  loadFeedback(): void {
    this.feedbackService.getCollocationFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error loading feedback:', error);
      },
      () => {
        console.log('Load feedback completed.'); 
      }
    );
  }
    deleteFeedback(id:number)  {
    this.feedbackService.deleteFeedback(id).subscribe(data=> { 
      console.log(data); 
      this.loadFeedback(); 
    })
  } 

updateFeedback(id: number){
  this.router.navigate(['Collocation/updateFeedback', id]);
}
showDetailsFeedback(id: number){
  this.router.navigate(['Collocation/showDetailsFeedback', id]);
}

}
