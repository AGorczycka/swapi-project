import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldContainerComponent } from './battlefield-container.component';

describe('BattlefieldContainerComponent', () => {
  let component: BattlefieldContainerComponent;
  let fixture: ComponentFixture<BattlefieldContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
