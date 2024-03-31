import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {

  @Input() titleClass: string = '';
  @Input() tagClass: string = '';
  @Input() tag: string = '';
  @Input() heading: string = '';
  @Input() desc: string = '';
  @Input() textWhite: boolean = false;
  @Input() svgIcon: boolean = false;
  @Input() type: string = '';
  @Input() svgClass: boolean = false;
  @Input() descClass: string;

}
