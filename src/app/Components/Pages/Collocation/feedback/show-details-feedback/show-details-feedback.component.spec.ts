import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsFeedbackComponent } from './show-details-feedback.component';

describe('ShowDetailsFeedbackComponent', () => {
  let component: ShowDetailsFeedbackComponent;
  let fixture: ComponentFixture<ShowDetailsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDetailsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
