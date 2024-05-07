import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Events } from 'src/app/models/modelM/Events';
import { EventsService } from 'src/app/services/servicesM/events.service';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-multiforms',
  templateUrl: './multiforms.component.html',
  styleUrls: ['./multiforms.component.scss']
})
export class MultiformsComponent implements OnInit {
  eventForm: FormGroup;
  isLinear = true;
  animationDuration = '1000ms';
  isLastStepValid = false;
  isOptional = true;

  positionOptions: TooltipPosition[] = ['before', 'after', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);

  

  @ViewChild('stepper') stepper?: MatStepper;

  constructor(private fb: FormBuilder, private eventsService: EventsService) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      dateE: ['', [Validators.required, this.validateDate]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      attendeeCount: [0, [Validators.required, Validators.min(11)]],
      price: [0, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required] 
   
    });
  }

  selectedImage: string | ArrayBuffer | null = null;

  ngOnInit(): void {}

  validateDate(control: any): {[key: string]: any} | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = 'assetsaif/images/about/'+file.name;
        this.eventForm.get('image')?.setValue(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  categories: string[] = ['Charity', 'Entertainment', 'Educational', 'Community', 'Sports', 'Art', 'Cultural'];

addEvent(): void {
  if (this.eventForm.valid) {
    const eventData: Events = this.eventForm.value;

    // Ensure selectedImage is properly set
    eventData.image = this.selectedImage as string;

    this.eventsService.addEvent(1, eventData).subscribe(
      (addedEvent) => {
        console.log('New event added:', addedEvent);
        if (this.stepper) {
          this.stepper.next();
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error('Error adding event:', error.message);
          console.error('Status code:', error.status);
          console.error('Response body:', error.error);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  } else {
    console.error('Form is invalid');
  }
}


  checkLastStepValidity(): void {
    if (this.stepper) {
      const lastStepIndex = this.stepper.steps.length - 1;
      const secondLastStep = this.stepper.steps.toArray()[lastStepIndex - 1];

      this.isLastStepValid = secondLastStep.completed;
    }
  }
}
