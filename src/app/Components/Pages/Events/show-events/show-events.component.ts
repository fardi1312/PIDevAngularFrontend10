import { Component, OnInit, Inject, Input } from '@angular/core';
import { EventsService } from 'src/app/services/servicesM/events.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Events } from 'src/app/models/modelM/Events';
import { Comment } from 'src/app/models/modelM/Comment';
import { EventRequest } from 'src/app/models/modelM/EventRequest';




@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.css']
})
export class ShowEventsComponent implements OnInit{
  namee : String = '';
  eventId;
  eventee?: Events;
  acceptConditions: boolean = false;
  showDetails: boolean = false;
  showComments: boolean = false;
  newComment: string = '';
  comments: Comment[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data:any , private snackBar: MatSnackBar, private dialogRef : MatDialog,public eventsService: EventsService) {
    this.eventId = data.eventId
  }
test:number=0;
  ngOnInit(): void {

    console.log("eeehhee",this.newComment)
    this.fetchEventbyId();
    console.log("ccc",this.data.eventId);
    console.log("eventt",this.eventee!);
  
  }

  
  toggleComments() {
    this.showComments = !this.showComments; // Toggle the value of showComments
  
    if (this.showComments) { // Fetch comments only if showComments is true
      this.eventsService.getEventById(this.data.eventId).subscribe((events: Events) => { 
        this.eventee = events;
        console.log("Fetched event with comments:", this.eventee);
  
        this.eventsService.getCommentsByEvent(this.eventee.eventID as number).subscribe(
          (comments: Comment[]) => {
            this.comments = comments; // Assign received comments to this.comments
            console.log("comments", this.comments);
          },
          (error) => {
            console.error("Error fetching comments:", error);
          }
        );
      });
    }
  }
  
  
  

  addComment(comment:string) {
    console.log("dkhl");
console.log("vvv",comment);
    console.log( "gggggg",comment)
    if (comment.trim() !== '') {
      console.log("d222222");

      const sanitizedComment = this.eventsService.sanitizeText(comment);
      console.log("dk3333333333");

      const newComment: Comment = {
        content: sanitizedComment, 
        event: this.eventee!,
        createdAt: new Date() 
      };
      console.log("dkhl4444444",newComment);

      this.eventsService.createComment(newComment, this.eventId, 1).subscribe(
        (comment: Comment) => {
          this.comments.push(comment);
          this.newComment = ''; 
          console.log("dkhl4444444",comment);

        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
  

  
  confirmParticipation () : void {
    this.dialogRef.closeAll;
    this.eventsService.participate(this.data.eventId).subscribe(
      (EventRequest:EventRequest) => {
        console.log('Successfully participated in event.',EventRequest);
      
        this.snackBar.open('Successfully participated in event.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']          
        });
  
      },
      error => {
        console.error('Error participating in event:', error);
       
      }
    );
   
    this.test=1;
  }

  close(){

this.test=1;
  }
  fetchEventbyId(): void {
    this.eventsService.getEventById( this.data.eventId).subscribe((events: Events) => {
      this.eventee= events;
    console.log("sifon",events);
  
    console.log("condition",this.eventee!.conditionOfParticipation);
    console.log("eventtttttttt",this.eventee!);
       if (this.eventee!.conditionOfParticipation==null) {
          this.acceptConditions = true;
 
        }
    });
  } 

  deleteComment(commentId: number) {
    this.eventsService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error => {
        console.error('Error deleting comment:', error);
      }
    );
  }
  
}
