import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatgouvComponent } from './statgouv.component';

describe('StatgouvComponent', () => {
  let component: StatgouvComponent;
  let fixture: ComponentFixture<StatgouvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatgouvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatgouvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
