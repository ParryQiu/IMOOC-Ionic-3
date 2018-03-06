import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmojipickerComponent } from './emojipicker/emojipicker';
@NgModule({
	declarations: [EmojipickerComponent],
	imports: [IonicPageModule .forChild(EmojipickerComponent),],
	exports: [EmojipickerComponent]
})
export class ComponentsModule {}
