import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';
import {PipesModule} from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    ChatPage,
    PipesModule
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ChatPage),
  ],
})
export class ChatPageModule {}
