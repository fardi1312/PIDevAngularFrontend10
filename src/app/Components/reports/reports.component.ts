import { Component } from '@angular/core';
import { ReportsData } from '../../shared/data/data/reports/reports';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  public reportsData = ReportsData;

}
