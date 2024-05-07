import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editpost9achComponent } from './editpost9ach.component';

describe('Addpost9achComponent', () => {
  let component: Editpost9achComponent;
  let fixture: ComponentFixture<Editpost9achComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Editpost9achComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editpost9achComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
