import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  userinfo: Object;
  ChatdetailsPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //你在这里也可以直接从你的 API 接口或者其他的方法实现用户列表的定义
    this.userinfo = {
      userid: '123321',
      username: '慕女神'
    }
    this.ChatdetailsPage = ChatdetailsPage;
  }
}
