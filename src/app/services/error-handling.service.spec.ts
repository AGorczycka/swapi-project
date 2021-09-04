import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ErrorHandlingService } from './error-handling.service';
import { BattlefieldContainerService } from '../features/battlefield-container/battlefield-container.service'

describe('ErrorHandlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ErrorHandlingService, BattlefieldContainerService]
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: ErrorHandlingService = TestBed.get(ErrorHandlingService);
    
    expect(service).toBeTruthy();
  });

});
