import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserdatalistPage } from './userdatalist';

@NgModule({
  declarations: [
    UserdatalistPage,
  ],
  imports: [
    IonicPageModule.forChild(UserdatalistPage),
  ],
})
export class UserdatalistPageModule {}
