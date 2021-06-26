import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDeleteConfirmComponent } from './release-delete-confirm.component';

describe('ReleaseDeleteConfirmComponent', () => {
  let component: ReleaseDeleteConfirmComponent;
  let fixture: ComponentFixture<ReleaseDeleteConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseDeleteConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
