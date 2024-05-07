import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { CarpoolingService } from 'src/app/services/servicesSM/carpooling.service';
import { QuizService } from 'src/app/services/serviceOns/quiz.service';
import { Option } from 'src/app/models/modelOns/Question';
import { SpinComponent } from '../spin/spin.component';

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.css']
})
export class CartHomeComponent {
  constructor(private http: HttpClient, private carpoolingService: CarpoolingService ,private quizService: QuizService) {
 
  }
  isStartButtonDisabled: boolean = false;

  userId:number=5565;
  isQuizEnded:boolean= false;
  remain:number=10;
subb : Subscription[]=[];
correctNum :number=0;
  showWarning: boolean = false;
  isQuizStarted: boolean = false;
  questionsList: any[] = [];
  currentQuestions: number = 0;
timer=interval(1000);

  loadQuestions(): void {
    console.log("bb"); // Afficher les questions dans la console

    this.quizService.getAllQuestions().subscribe(questions => {
      console.log("22222bb"); // Afficher les questions dans la console

      console.log("ddddddd",questions); // Afficher les questions dans la console
      this.questionsList = questions;
      console.log("dlks",this.questionsList[0].question);
    });
  }
  selectedOptionIndex: number | null = null; // Indice de l'option sélectionnée, initialisé à null


  
  currentQuestion: number = 0; // Initialiser à 0 ou à l'indice de la première question

optionSelected(option: Option) {
  console.log('Option selected:', option.answer);
  // Mettre à jour l'indice de l'option sélectionnée
  this.selectedOptionIndex = this.questionsList[this.currentQuestion]?.options.indexOf(option);
}
selectOption(option: Option) {
  option.isSelected = !option.isSelected;
  if(option.correct){
    this.correctNum++;
  }
}



isOptionSelected(options: Option[]){
  const selectionCount =  options.filter((m:Option)=>m.isSelected==true).length;
if(selectionCount==0){
return false;
}else{
return true;
}
}
  

  ngOnInit() {
    this.loadQuestions();
 
  }
  quit() {
    this.showWarning = false;
    this.isQuizStarted = false;
    this.isStartButtonDisabled = true;

    this.isQuizEnded = false;
  
}


  
continue() {
  this.quizService.startQuiz(this.userId).subscribe(
    (response) => {
      if (response) {
        console.log('Quiz started successfully');
        this.showWarning = true;
      } else {
        console.error('Failed to start quiz: Quiz not started');
        // Handle error or show a different modal for error
      }
    },
    (error) => {
      console.error('Failed to start quiz:', error);
      // Handle error or show a different modal for error
    }
  );
}


continue1(){
  this.showWarning=true;
}


  startQuiz1() {
    
    
    this.showWarning = false;
    this.isQuizStarted = true; 
    this.subb.push(
    this.timer.subscribe(questions => {
      console.log(questions); // This will log the index of each emitted value
      if (this.remain !== 0) {
        this.remain--; // Decrease the value of 'remain' every second
      }
      if(this.remain==0){
        this.nextQestion();
        this.remain=10;

      }
    
    }))
  }



  nextQestion(){
    if(this.currentQuestions<this.questionsList.length-1){
      this.currentQuestions++;

    }else {
      this.subb.forEach(
        element=>{
          element.unsubscribe();
        }
      );
    }
     

  }

  showWarningPopup() {
    this.showWarning = !this.showWarning; // Toggle the showWarning flag
  }



  selectOption1(option : any){
    if(option.Correct){
      this.correctNum++;
    }
    option.isSelected=true;

  }
  /*isOptionSelected(options:any){
    const selectionCount =  options.filter((m:any)=>m.isSelected==true).length;
if(selectionCount==0){
  return false;
}else{
  return true;
}

  }*/
  finish() {
    this.isQuizEnded = true;
    this.isQuizStarted = false;
    if (this.correctNum === this.questionsList.length) {
        console.log("9ad 9ad");
       // this.showSpinningModal(); 

       
    }
}

showModal:Boolean=false;

finish1() {
 // this.isQuizEnded = true;
  this.isQuizStarted = false;
  if (this.correctNum === this.questionsList.length) {
      console.log("All answers are correct");
      this.showModal = true; // Show the spinning modal
      
  }
  else {
    this.isQuizEnded = true;
    // Set isQuizEnded back to false after 1 second
    setTimeout(() => {
        this.isQuizEnded = false;
    }, 1500);
}
}

}
