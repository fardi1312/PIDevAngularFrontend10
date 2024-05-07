import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilPostComponent } from './acceuil-post.component';

describe('AcceuilPostComponent', () => {
  let component: AcceuilPostComponent;
  let fixture: ComponentFixture<AcceuilPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceuilPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceuilPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
