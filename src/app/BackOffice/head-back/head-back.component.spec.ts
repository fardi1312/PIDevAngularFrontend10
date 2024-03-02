import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadBackComponent } from './head-back.component';

describe('HeadBackComponent', () => {
  let component: HeadBackComponent;
  let fixture: ComponentFixture<HeadBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
