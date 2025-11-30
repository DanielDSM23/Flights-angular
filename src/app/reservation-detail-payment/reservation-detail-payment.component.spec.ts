import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDetailPaymentComponent } from './reservation-detail-payment.component';

describe('ReservationDetailPaymentComponent', () => {
  let component: ReservationDetailPaymentComponent;
  let fixture: ComponentFixture<ReservationDetailPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDetailPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDetailPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
