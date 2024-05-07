import { Component } from '@angular/core';
import { propertySalesData } from '../../../shared/data/data/reports/reports';

@Component({
  selector: 'app-property-sales',
  templateUrl: './property-sales.component.html',
  styleUrls: ['./property-sales.component.scss']
})
export class PropertySalesComponent {

  public propertySales = propertySalesData;

}
