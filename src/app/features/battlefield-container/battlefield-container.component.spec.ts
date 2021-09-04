import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BattlefieldContainerComponent } from './battlefield-container.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BattlefieldContainerService } from './battlefield-container.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BattlefieldContainerComponent', () => {
  let component: BattlefieldContainerComponent;
  let fixture: ComponentFixture<BattlefieldContainerComponent>;
  let service: BattlefieldContainerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldContainerComponent, CardsContainerComponent ],
      imports: [ 
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCardModule
      ],
      providers: [ BattlefieldContainerService ]
    })
    .compileComponents();
    service = TestBed.inject(BattlefieldContainerService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set resource on init", () => {
    const spy = spyOn(component, "setResource");

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should enable select', () => {
    const param: boolean = true;

    spyOn(component, 'enableSelect');
    component.enableSelect(param);

    expect(component.enableSelect).toHaveBeenCalledWith(true);
  });

  it('should call setResourceValue method on init', () => {
    const userServiceSpy = spyOn(service, 'setResourceValue').and.callThrough();
    const componentSpy = spyOn(component, 'setResource').and.callThrough();
  
    expect(userServiceSpy).not.toHaveBeenCalled();
    expect(componentSpy).not.toHaveBeenCalled();
  
    component.ngOnInit();
  
    expect(userServiceSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledTimes(1);
  });
});