import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteCustomerComponent } from './modal-delete-customer.component';

describe('ModalDeleteCustomerComponent', () => {
  let component: ModalDeleteCustomerComponent;
  let fixture: ComponentFixture<ModalDeleteCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDeleteCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
