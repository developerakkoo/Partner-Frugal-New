import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDocsPageRoutingModule } from './upload-docs-routing.module';

import { UploadDocsPage } from './upload-docs.page';
import { FileDragnDropDirective } from 'src/app/file-dragn-drop.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UploadDocsPageRoutingModule
  ],
  declarations: [UploadDocsPage]
})
export class UploadDocsPageModule {}
