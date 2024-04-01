import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPreferencesComponent } from './show-preferences.component';

describe('ShowPreferencesComponent', () => {
  let component: ShowPreferencesComponent;
  let fixture: ComponentFixture<ShowPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPreferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
