import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinComponentComponent } from './join.component';

describe('JoinComponentComponent', () => {
  let component: JoinComponentComponent;
  let fixture: ComponentFixture<JoinComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
