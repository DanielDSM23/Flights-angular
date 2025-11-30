import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSummaryCardComponent } from './flight-summary-card.component';

describe('FlightSummaryCardComponent', () => {
  let component: FlightSummaryCardComponent;
  let fixture: ComponentFixture<FlightSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
