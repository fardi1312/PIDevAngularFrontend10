import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addpost9achComponent } from './addpost9ach.component';

describe('Addpost9achComponent', () => {
  let component: Addpost9achComponent;
  let fixture: ComponentFixture<Addpost9achComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addpost9achComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addpost9achComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
