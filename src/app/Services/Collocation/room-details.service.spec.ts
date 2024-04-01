import { TestBed } from '@angular/core/testing';
import { RoomDetailssService } from './room-details.service';


describe('RoomDetailsService', () => {
  let service: RoomDetailssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomDetailssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
