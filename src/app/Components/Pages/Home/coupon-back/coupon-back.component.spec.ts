import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponBackComponent } from './coupon-back.component';

describe('CouponBackComponent', () => {
  let component: CouponBackComponent;
  let fixture: ComponentFixture<CouponBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
