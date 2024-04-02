import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprefrencesComponent } from './updateprefrences.component';

describe('UpdateprefrencesComponent', () => {
  let component: UpdateprefrencesComponent;
  let fixture: ComponentFixture<UpdateprefrencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprefrencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprefrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
