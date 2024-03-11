import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePhotoProfileComponent } from './update-photo-profile.component';

describe('UpdatePhotoProfileComponent', () => {
  let component: UpdatePhotoProfileComponent;
  let fixture: ComponentFixture<UpdatePhotoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePhotoProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePhotoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
