import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeadfacePage } from './headface';

@NgModule({
  declarations: [
    HeadfacePage,
  ],
  imports: [
    IonicPageModule.forChild(HeadfacePage),
  ],
})
export class HeadfacePageModule {}
