import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBackOfficeComponent } from './show-back-office.component';

describe('ShowBackOfficeComponent', () => {
  let component: ShowBackOfficeComponent;
  let fixture: ComponentFixture<ShowBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBackOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
