import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubStat2Component } from './club-stat2.component';

describe('ClubStat2Component', () => {
  let component: ClubStat2Component;
  let fixture: ComponentFixture<ClubStat2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubStat2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubStat2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
