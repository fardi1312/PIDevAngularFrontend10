import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClubDetailsComponent } from './show-club-details.component';

describe('ShowClubDetailsComponent', () => {
  let component: ShowClubDetailsComponent;
  let fixture: ComponentFixture<ShowClubDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowClubDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowClubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
