import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHelpsComponent } from './user-helps.component';

describe('UserHelpsComponent', () => {
  let component: UserHelpsComponent;
  let fixture: ComponentFixture<UserHelpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHelpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHelpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
