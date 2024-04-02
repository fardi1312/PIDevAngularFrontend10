import { TestBed } from '@angular/core/testing';
import { CollocationPreferencesService } from './preferences.service';


describe('PreferencesService', () => {
  let service: CollocationPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollocationPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
