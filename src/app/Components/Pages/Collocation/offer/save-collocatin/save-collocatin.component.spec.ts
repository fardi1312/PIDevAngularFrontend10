import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCollocatinComponent } from './save-collocatin.component';

describe('SaveCollocatinComponent', () => {
  let component: SaveCollocatinComponent;
  let fixture: ComponentFixture<SaveCollocatinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCollocatinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveCollocatinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
