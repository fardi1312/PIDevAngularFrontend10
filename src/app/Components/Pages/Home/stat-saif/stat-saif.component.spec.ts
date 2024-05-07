import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatSaifComponent } from './stat-saif.component';

describe('StatSaifComponent', () => {
  let component: StatSaifComponent;
  let fixture: ComponentFixture<StatSaifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatSaifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatSaifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
