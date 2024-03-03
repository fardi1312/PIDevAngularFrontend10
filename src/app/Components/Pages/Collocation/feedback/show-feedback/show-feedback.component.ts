import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationFedback } from 'src/app/Model/Collocation/CollocationFeedback';
import { FeedbackService } from 'src/app/Services/Collocation/feedback.service';

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
  loadFeedback() { 
    this.feedbackService.getCollocationFeedbacks().subscribe( 
      (data)=>{ 
        this.feedbacks = data ; 
      }, 
      (error) => { 
        console.error('Error :' ,error) ; 
      }
    ); 
  }  
  deleteFeedback(id:number)  {
    this.feedbackService.deleteFeedback(id).subscribe(data=> { 
      console.log(data); 
      this.loadFeedback(); 
    })
  } 
  deleteOffer(id: number){
    this.feedbackService.deleteFeedback(id).subscribe( data => {
        console.log(data);
        this.loadFeedback();
    })
}
updateOffer(id: number){
  this.router.navigate(['Collocation/updateFeedback', id]);
}
offerDetails(id: number){
  this.router.navigate(['Collocation/showDetailsFeedback', id]);
}

}
