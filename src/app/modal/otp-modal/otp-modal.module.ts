import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpModalPageRoutingModule } from './otp-modal-routing.module';

import { OtpModalPage } from './otp-modal.page';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgOtpInputModule,
    OtpModalPageRoutingModule
  ],
  declarations: [OtpModalPage]
})
export class OtpModalPageModule {}
