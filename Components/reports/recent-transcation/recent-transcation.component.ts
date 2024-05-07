import { Component } from '@angular/core';
import { recentTranscation } from '../../../shared/data/data/reports/reports';

@Component({
  selector: 'app-recent-transcation',
  templateUrl: './recent-transcation.component.html',
  styleUrls: ['./recent-transcation.component.scss']
})
export class RecentTranscationComponent {

  public recentTranscation = recentTranscation;

}
