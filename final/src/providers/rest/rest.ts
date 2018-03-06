import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    //console.log('Hello RestProvider Provider');
  }

  //feed
  private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';

  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';

  private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";

  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
  private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";



  //notification
  private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";

  //* 注意：因为课程是主要讲解 ionic 的技术点
  //* 安全性方面你需要自己去做详细的设计和处理
  //* 密码的传递应该在传递参数之前进行加密，并且服务器端也应该进行相应的处理
  //* 具体的问题可以在慕课后台提问交流

  /**
   * 根据用户的手机号码和密码进行登录
   * 
   * @param {any} mobile 
   * @param {any} password 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  login(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }

  /**
   * 获取用户的信息
   * 
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserInfo(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId);
  }

  /**
   * 更新用户的昵称
   * 
   * @param {any} userId 
   * @param {any} nickname 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  updateNickName(userId, nickname): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname);
  }

  /**
   * 保存提问
   * 
   * @param {any} userId 
   * @param {any} title 
   * @param {any} content 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  saveQuestion(userId, title, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
  }

  /**
   * 获取问题的详情
   * 
   * @param {any} id 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestion(id): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
  }

  /**
   * 获取问题的详情，传递 userid 获取到当前用户有没有关注此问题
   * 
   * @param {any} questionId 
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestionWithUser(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + questionId + "&userid=" + userId);
  }

  saveFavourite(questionId, userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
  }

  answer(userId, questionId, content): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlAnswer + "?userid=" + userId + "&questionid=" + questionId + "&content=" + content);
  }

  /**
   * 注册请求
   * 
   * @param {any} mobile 
   * @param {any} nickname 
   * @param {any} password 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  register(mobile, nickname, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&nickname=" + nickname + "&password=" + password)
  }

  /**
   * 请求首页的 feeds 流
   * 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getFeeds(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlFeeds);
  }

  /**
   * 获取所有的新问题
   * 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestions(): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlQuestionList);
  }

  /**
   * 获取用户的提醒消息
   * 
   * @param {any} userId 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserNotifications(userId): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlUserNotifications + "?userid=" + userId);
  }

  /**
   * 获取用户的相关问题列表
   * 
   * @param {any} userId 
   * @param {any} type  question/answer/favourite
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  getUserQuestionList(userId, type): Observable<string[]> {
    return this.getUrlReturn(this.apiGetUserQuestionList + "?userid=" + userId + "&type=" + type);
  }

  /**
   * 全局获取 HTTP 请求的方法
   * @Parry
   * @private
   * @param {string} url 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  private getUrlReturn(url: string): Observable<string[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * 处理接口返回的数据，处理成 json 格式
   * 
   * @private
   * @param {Response} res 
   * @returns 
   * @memberof RestProvider
   */
  private extractData(res: Response) {
    let body = res.json();
    return JSON.parse(body) || {};
  }

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并在 console 中显示 error
   * 
   * @private
   * @param {(Response | any)} error 
   * @returns 
   * @memberof RestProvider
   */
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
