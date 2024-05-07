import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusmComponent } from './menusm.component';

describe('MenusmComponent', () => {
  let component: MenusmComponent;
  let fixture: ComponentFixture<MenusmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenusmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
