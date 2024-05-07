import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFideliteComponent } from './transfer-fidelite.component';

describe('TransferFideliteComponent', () => {
  let component: TransferFideliteComponent;
  let fixture: ComponentFixture<TransferFideliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferFideliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferFideliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
