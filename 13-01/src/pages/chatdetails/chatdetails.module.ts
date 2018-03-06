import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatdetailsPage } from './chatdetails';
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    ChatdetailsPage,
    ComponentsModule
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ChatdetailsPage),
  ],
})
export class ChatdetailsPageModule {}
