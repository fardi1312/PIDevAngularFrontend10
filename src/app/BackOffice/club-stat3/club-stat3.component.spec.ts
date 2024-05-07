import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStat3Component } from './club-stat3.component';

describe('ClubStat3Component', () => {
  let component: ClubStat3Component;
  let fixture: ComponentFixture<ClubStat3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubStat3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubStat3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
