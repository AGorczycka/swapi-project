import { TestBed } from '@angular/core/testing';
import { BattlefieldContainerService } from './battlefield-container.service';

describe('BattlefieldContainerService', () => {
  let service: BattlefieldContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattlefieldContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
