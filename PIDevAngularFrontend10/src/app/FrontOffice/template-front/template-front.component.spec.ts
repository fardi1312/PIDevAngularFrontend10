import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateFrontComponent } from './template-front.component';

describe('TemplateFrontComponent', () => {
  let component: TemplateFrontComponent;
  let fixture: ComponentFixture<TemplateFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
