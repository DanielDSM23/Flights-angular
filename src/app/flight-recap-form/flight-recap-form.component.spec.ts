import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightRecapFormComponent } from './flight-recap-form.component';

describe('FlightRecapFormComponent', () => {
  let component: FlightRecapFormComponent;
  let fixture: ComponentFixture<FlightRecapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightRecapFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightRecapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
