import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackOfficeQuizComponent } from './back-office-quiz.component';

describe('BackOfficeQuizComponent', () => {
  let component: BackOfficeQuizComponent;
  let fixture: ComponentFixture<BackOfficeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackOfficeQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackOfficeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
