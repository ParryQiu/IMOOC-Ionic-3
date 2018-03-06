import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';

//聊天信息的属性
export class ChatMessage {
  messageId: string;
  userId: string;
  username: string;
  userImgUrl: string;
  toUserId: string;//发送给谁的
  time: number | string;
  message: string;
  status: string;
}

//用户信息的属性
export class UserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
}

@Injectable()
export class ChatserviceProvider {

  constructor(public http: Http, public event: Events) {

  }

  /**
   * 获取消息列表
   * 从 API 获取或者从模拟的 JSON 获取
   * @returns null 
   * @memberof ChatserviceProvider
   */
  getMessageList(): Promise<ChatMessage[]> {
    const url = '../assets/mock/msg-list.json';
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().array as ChatMessage[])
      .catch(error => Promise.reject(error || '错误信息'));
  }

  sendMessage(message: ChatMessage) {
    return new Promise(resolve => setTimeout(() => {
      resolve(message)
    }, Math.random() * 1000))
      .then(() => {
        this.mockNewMessage(message);
      });
  }

  /**
   * 模拟对方回复了一个消息
   * 这里要思考：前台如何即时地能接受到这个消息？
   * 引入 Events 模块
   * 
   * @param {*} message 
   * @memberof ChatserviceProvider
   */
  mockNewMessage(message: any) {
    const id = Date.now().toString();
    let messageSend: ChatMessage = {
      messageId: id,
      userId: '123321',
      username: '慕女神',
      userImgUrl: 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
      toUserId: message.userId,
      time: Date.now(),
      message: '你是不是刚才给我发送了「' + message.message + '」？',
      status: 'success'
    }

    //进行消息的发布，类似大喇叭进行广播。
    
    setTimeout(() => {
      this.event.publish('chat.received', messageSend, Date.now())
    }, Math.random() * 1000)

  }

}
