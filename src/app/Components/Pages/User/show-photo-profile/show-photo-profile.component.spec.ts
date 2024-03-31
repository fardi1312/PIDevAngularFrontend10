import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPhotoProfileComponent } from './show-photo-profile.component';

describe('ShowPhotoProfileComponent', () => {
  let component: ShowPhotoProfileComponent;
  let fixture: ComponentFixture<ShowPhotoProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPhotoProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPhotoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
