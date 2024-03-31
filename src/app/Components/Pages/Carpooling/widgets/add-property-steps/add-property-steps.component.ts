import { Component, Input, TrackByFunction } from '@angular/core';
import { propertySteps } from 'src/app/shared/data/add-property';

@Component({
  selector: 'app-add-property-steps',
  templateUrl: './add-property-steps.component.html',
  styleUrls: ['./add-property-steps.component.scss'],
})
export class AddPropertyStepsComponent {
  @Input() addPropertyStepsData: propertySteps[] = [];
  @Input() activeSteps: number = 0;

  trackByFn: TrackByFunction<propertySteps> = (index, item) => item.stepNumber;
}
