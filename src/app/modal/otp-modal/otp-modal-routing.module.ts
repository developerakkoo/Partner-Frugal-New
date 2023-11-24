import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpModalPage } from './otp-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OtpModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpModalPageRoutingModule {}
