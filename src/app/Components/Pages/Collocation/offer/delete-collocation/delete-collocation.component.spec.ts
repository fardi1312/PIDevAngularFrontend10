import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollocationComponent } from './delete-collocation.component';

describe('DeleteCollocationComponent', () => {
  let component: DeleteCollocationComponent;
  let fixture: ComponentFixture<DeleteCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCollocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
