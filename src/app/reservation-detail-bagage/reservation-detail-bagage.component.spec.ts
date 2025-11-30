import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationDetailBagageComponent } from './reservation-detail-bagage.component';

describe('ReservationDetailBagageComponent', () => {
  let component: ReservationDetailBagageComponent;
  let fixture: ComponentFixture<ReservationDetailBagageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationDetailBagageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationDetailBagageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
