import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollocationFedback } from 'src/app/Model/Collocation/CollocationFeedback';
import { FeedbackService } from 'src/app/Services/Collocation/feedback.service';

@Component({
  selector: 'app-update-feedback',
  templateUrl: './update-feedback.component.html',
  styleUrls: ['./update-feedback.component.css']
})
export class UpdateFeedbackComponent implements OnInit {   
  id!: number;
  collocationFeedback: CollocationFedback = {  
    idCollocationFeedback: 0, 
    feedbackDescription: "",  
    feedbackDate: new Date(),
    rating: 0
  } 
           
  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      
      // Fetch existing feedback data
      this.feedbackService.getCollocationFeedbackById(this.id).subscribe(data => {
        this.collocationFeedback = data;
      }, error => console.log(error));
    });
  }

  onSubmit() {
    this.feedbackService.updateFeedback(this.id, this.collocationFeedback).subscribe(data => {
      this.goToFeedbackList();
    }, error => console.log(error));
  }

  goToFeedbackList() {
    this.router.navigate(['/Collocation/showFeedback']);
  }
}
