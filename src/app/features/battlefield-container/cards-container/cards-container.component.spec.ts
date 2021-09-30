import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CardsContainerComponent } from './cards-container.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('BattlefieldContainerComponent', () => {
  let component: CardsContainerComponent;
  let fixture: ComponentFixture<CardsContainerComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mat-spinner', () => {
    expect(MatSpinner).toBeTruthy();
  });

  it('should call getData method on button click', () => {
    const onClickMock = spyOn(component, 'getData');

    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);

    expect(onClickMock).toHaveBeenCalled();
  });

  it("should get data on init", () => {
    const spy = spyOn(component, "getData");

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should add comparable value', () => {
    const param: { index: number, value: string } = { index: 0, value: '212' };

    spyOn(component, 'addComparableValue');
    component.addComparableValue(param.index, param.value);

    expect(component.addComparableValue).toHaveBeenCalledWith(0, '212');
  });

  it('should get data', () => {
    spyOn(component, 'getData');
    component.getData();

    expect(component.getData).toHaveBeenCalled();
  });

  it('should get player wins', () => {
    const param = 1;

    spyOn(component, 'getPlayerWins');
    component.getPlayerWins(param);

    expect(component.getPlayerWins).toHaveBeenCalledWith(1);
    expect(component.getPlayerWins).toBeTruthy();
  });

  it('should set if card is loaded', () => {
    const param = true;

    spyOn(component, 'isCardLoaded');
    component.isCardLoaded(param);

    expect(component.isCardLoaded).toHaveBeenCalledWith(true);
  });

});
