import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCollocationComponent } from './show-collocation.component';

describe('ShowCollocationComponent', () => {
  let component: ShowCollocationComponent;
  let fixture: ComponentFixture<ShowCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCollocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
