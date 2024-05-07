import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Post9achComponent } from './post9ach.component';

describe('Post9achComponent', () => {
  let component: Post9achComponent;
  let fixture: ComponentFixture<Post9achComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Post9achComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Post9achComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
