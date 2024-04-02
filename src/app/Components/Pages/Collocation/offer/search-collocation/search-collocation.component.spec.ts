import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCollocationComponent } from './search-collocation.component';

describe('SearchCollocationComponent', () => {
  let component: SearchCollocationComponent;
  let fixture: ComponentFixture<SearchCollocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCollocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCollocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
