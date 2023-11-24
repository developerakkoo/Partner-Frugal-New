import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessModalPage } from './success-modal.page';

describe('SuccessModalPage', () => {
  let component: SuccessModalPage;
  let fixture: ComponentFixture<SuccessModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
