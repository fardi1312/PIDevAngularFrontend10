import { Component } from '@angular/core';
import { Question } from 'src/app/models/modelOns/Question';
import { QuizService } from 'src/app/services/serviceOns/quiz.service';

@Component({
  selector: 'app-back-office-quiz',
  templateUrl: './back-office-quiz.component.html',
  styleUrls: ['./back-office-quiz.component.css']
})
export class BackOfficeQuizComponent {
  showAddQuestionModal: boolean = false;
  showExtraAnswer = false;
  questions: Question[] = [];
  question: string = '';

  answers: string[] = [''];
  correctAnswerIndex: number=0;
  constructor(private quizService: QuizService) { }

  onclick(){
    this.showAddQuestionModal=true;
  }
  closeQuestionModal(){
    this.showAddQuestionModal=false;

  }
  save() {
    const questions: Question[] = [
      {
        question: this.question,
        options: this.answers.map((answer, index) => ({
          answer,
          correct: this.correctAnswerIndex === index
        }))
      }
    ];
  
    this.quizService.addQuestions(questions).subscribe(() => {

      this.question = '';
      this.answers = [''];
      this.loadQuestions();

      this.showAddQuestionModal = false;
    });
  }



  

  
  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.quizService.getAllQuestions().subscribe(questions => {
      console.log(questions); // Afficher les questions dans la console
      this.questions = questions;
    });
  }
  deleteQuestion(questionId: number): void {
    console.log('Deleting question...');
    if (window.confirm('Are you sure you want to delete this question?')) {
      this.quizService.deleteQuestion(questionId).subscribe(() => {
        this.questions = this.questions.filter(question => question.id !== questionId);
      });
    }
  }
  
  
  
  
  


  

  addAnswer() {
    this.answers.push('');
    
  }
}
