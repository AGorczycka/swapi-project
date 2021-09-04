import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { CardsContainerComponent } from './cards-container.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('BattlefieldContainerComponent', () => {
  let component: CardsContainerComponent;
  let fixture: ComponentFixture<CardsContainerComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsContainerComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatProgressSpinnerModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mat-spinner', () => {
    fixture.debugElement.query(By.directive(MatSpinner)).nativeElement;
    expect(MatSpinner).toBeTruthy();
  });

  it('should call getData method on button click', () => {
    const onClickMock = spyOn(component, 'getData' as never);
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(onClickMock).toHaveBeenCalled();
  });

});
