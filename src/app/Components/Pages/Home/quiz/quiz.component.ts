import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  constructor(public dialogRef: MatDialogRef<QuizComponent>) {}

  exitQuiz(): void {
    this.dialogRef.close();
  }
}
