import { Component , Input } from '@angular/core';
import { addPropertyStepsData } from 'src/app/shared/data/add-property';
import { CarpoolingOffer } from 'src/app/models/modelSM/CarpoolingOffer';

@Component({
  selector: 'app-submit-property',
  templateUrl: './submit-property.component.html',
  styleUrls: ['./submit-property.component.scss'],
})
export class SubmitPropertyComponent {
 activeCo: CarpoolingOffer ={ locationLx: '',
 locationLy: '',};
   
  public themeLogo = 'assets/images/logo/2.png';
  public footerLogo = 'assets/images/logo/footer-logo.png';
 

  public addPropertyStepsData = addPropertyStepsData;
  public activeSteps: number=0;
  public activeId: number=0;
  public theme_default3 = '#ff5c41';
  public theme_default4 = '#ff8c41';

  ngOnInit() {
    document.documentElement.style.setProperty('--theme-default', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default3', this.theme_default3);
    document.documentElement.style.setProperty('--theme-default4', this.theme_default4);

    const data = addPropertyStepsData.filter((data) => {
      return data.stepNumber === 1;
    });
    this.activeSteps = data[0].stepNumber;
  }

  ngOnDestroy(): void {
    document.documentElement.style.removeProperty('--theme-default');
    document.documentElement.style.removeProperty('--theme-default3');
    document.documentElement.style.removeProperty('--theme-default4');
  }


  public receiveCarpoolingOffer(co:CarpoolingOffer) {
    this.activeCo= co;
  }
  public receiveChildData(step: number) {
    this.activeSteps = step;
  }
}
