import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDeleteConfirmComponent } from './transfer-delete-confirm.component';

describe('TransferDeleteConfirmComponent', () => {
  let component: TransferDeleteConfirmComponent;
  let fixture: ComponentFixture<TransferDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferDeleteConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
