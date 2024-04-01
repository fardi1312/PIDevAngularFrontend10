import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailsCollocatinComponent } from './show-details-collocatin.component';

describe('ShowDetailsCollocatinComponent', () => {
  let component: ShowDetailsCollocatinComponent;
  let fixture: ComponentFixture<ShowDetailsCollocatinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailsCollocatinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDetailsCollocatinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
