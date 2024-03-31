import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() bgImage: string;
  @Input() title: string;
  @Input() parent: string;
  @Input() child: string;
  @Input() type: string;

}
