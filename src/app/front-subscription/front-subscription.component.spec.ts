import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontSubscriptionComponent } from './front-subscription.component';

describe('FrontSubscriptionComponent', () => {
  let component: FrontSubscriptionComponent;
  let fixture: ComponentFixture<FrontSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontSubscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
