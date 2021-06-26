import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDeleteConfirmComponent } from './order-delete-confirm.component';

describe('OrderDeleteConfirmComponent', () => {
  let component: OrderDeleteConfirmComponent;
  let fixture: ComponentFixture<OrderDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDeleteConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
