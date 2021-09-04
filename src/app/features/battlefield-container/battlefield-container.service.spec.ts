import { TestBed, waitForAsync } from '@angular/core/testing';

import { BattlefieldContainerService } from './battlefield-container.service';
import { IPerson } from 'src/app/models/IPerson';
import { IPlanet } from 'src/app/models/IPlanet';
import { ISpecies } from 'src/app/models/ISpecies';
import { IApiDataPage } from 'src/app/models/IApiDataPage';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

type ApiData = IPerson | IPlanet | ISpecies;

describe('BattlefieldContainerService', () => {
  let service: BattlefieldContainerService;
  let httpMock: HttpTestingController;

  const dataSource = 'people';
  const dataId = 1;

  const mockGetData: ApiData = {
    name: "Test name 1",
    height: "Test height",
    mass: "Test mass",
    hair_color: "Test hair_color",
    skin_color: "Test skin_color",
    eye_color: "Test eye_color",
    birth_year: "Test birth_year",
    gender: "Test gender",
    homeworld: "Test homeworld",
    films: ["Test film"],
    species: ["Test species"],
    vehicles: ["Test vehicles"],
    starships: ["Test starships"],
    created: "Test created",
    edited: "Test edited",
    url: "Test url",
  };

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule ],
          providers: [ BattlefieldContainerService ]
      });
      service = TestBed.inject(BattlefieldContainerService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve data from the API via GET', () => {
    service.getData(dataSource, dataId).subscribe(data => {
        expect(data).toEqual(mockGetData);
    });

    const request = httpMock.expectOne( `${service.baseUrl}/${dataSource}/${dataId}` );

    expect(request.request.method).toBe('GET');

    request.flush(mockGetData);
  });

  it('should throw getData error',
    waitForAsync(() => {
      const request = httpMock.expectNone( `${service.baseUrl}/${dataSource}/900` );

      expect(request).toBeFalsy();
    })
  );

  it('should be able to retrieve data count from the API via GET', () => {
    const mockGetDataCount: IApiDataPage = {
      count: 1,
      next: "Test next page",
      previous: "Test previous page",
      results: [ mockGetData ]
    };

    service.getDataCount('people').subscribe(data => {
        expect(data).toEqual(mockGetDataCount);
    });

    const request = httpMock.expectOne( `${service.baseUrl}/${dataSource}` );

    expect(request.request.method).toBe('GET');
    
    request.flush(mockGetDataCount);
  });

  it('should throw getDataCount error',
    waitForAsync(() => {
      const request = httpMock.expectNone( `${service.baseUrl}/test` );
      expect(request).toBeFalsy();
    })
  );

  afterEach(() => {
    httpMock.verify();
  });

});
