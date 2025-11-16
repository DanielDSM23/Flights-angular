import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxComponent } from './comboBox.component';

describe('ButtonComponent', () => {
  let component: ComboBoxComponent;
  let fixture: ComponentFixture<ComboBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
