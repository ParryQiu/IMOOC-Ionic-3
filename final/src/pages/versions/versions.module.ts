import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VersionsPage } from './versions';

@NgModule({
  declarations: [
    VersionsPage,
  ],
  imports: [
    IonicPageModule.forChild(VersionsPage),
  ],
})
export class VersionsPageModule {}
