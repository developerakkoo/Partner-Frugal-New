import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtpModalPage } from './otp-modal.page';

describe('OtpModalPage', () => {
  let component: OtpModalPage;
  let fixture: ComponentFixture<OtpModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OtpModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
