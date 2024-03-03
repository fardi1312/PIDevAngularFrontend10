import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollocationFedback } from 'src/app/Model/Collocation/CollocationFeedback';
import { FeedbackService } from 'src/app/Services/Collocation/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  collocationFeedback: CollocationFedback = {
    idCollocationFeedback: 0,
    feedbackDescription: '',
    rating: 0
  };

  constructor(private offerFeedback:FeedbackService,private router: Router) {}
  ngOnInit(): void {
  } 

  saveFeedback():void { 
    this.offerFeedback.createCollocationFeedback(this.collocationFeedback).subscribe(
      (createdFeedback: CollocationFedback) => { 
        console.log('Feedback saved Successfully' , createdFeedback); 
      }, 
      (error) =>{ 
        console.error('Error saving Feedback : ', error); 
        
      }
      ); 
  }
  onSubmit():void { 
    this.saveFeedback(); 
  } 
  goToOfferList() { 
    this.router.navigate(['/'])
  }
}
