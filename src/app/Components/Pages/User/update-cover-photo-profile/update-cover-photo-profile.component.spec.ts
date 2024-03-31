import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoverPhotoProfileComponent } from './update-cover-photo-profile.component';

describe('UpdateCoverPhotoProfileComponent', () => {
  let component: UpdateCoverPhotoProfileComponent;
  let fixture: ComponentFixture<UpdateCoverPhotoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCoverPhotoProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCoverPhotoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
