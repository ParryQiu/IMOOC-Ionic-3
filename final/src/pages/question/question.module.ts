import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionPage } from './question';

@NgModule({
  declarations: [
    QuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionPage),
  ],
})
export class QuestionPageModule {}
