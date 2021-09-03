import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BattlefieldContainerService } from './battlefield-container.service';

describe('BattlefieldContainerService', () => {
  let service: BattlefieldContainerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    }).compileComponents();
    service = TestBed.inject(BattlefieldContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
