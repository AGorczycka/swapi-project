import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SingleCardComponent } from './singe-card.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardModule, MatCardTitle } from '@angular/material/card';
import { By } from '@angular/platform-browser';

describe('SingleCardComponent', () => {
  let component: SingleCardComponent;
  let fixture: ComponentFixture<SingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCardComponent ],
      imports: [ 
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatCardModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create mat-spinner', () => {
    fixture.debugElement.query(By.directive(MatSpinner)).nativeElement;
    expect(MatSpinner).toBeTruthy();
  });

  it('should create mat-card', () => {
    fixture.debugElement.query(By.directive(MatCard)).nativeElement;
    expect(MatCard).toBeTruthy();
  });

  it('should not have mat-card-title at the beginning', () => {
    expect(fixture.debugElement.query(By.directive(MatCardTitle))).toBeNull();
  });

});