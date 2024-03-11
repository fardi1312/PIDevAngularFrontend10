import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserInfoComponentComponent } from './update-user-info-component.component';

describe('UpdateUserInfoComponentComponent', () => {
  let component: UpdateUserInfoComponentComponent;
  let fixture: ComponentFixture<UpdateUserInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserInfoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
