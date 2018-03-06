import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
  private apiUrlLoginWithMd5 = 'https://imoocqa.gugujiankong.com/api/account/loginwithmd5';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
  private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
  private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";

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
   * 登录，密码 MD5 加密后的登录功能
   * 
   * @param {any} mobile 
   * @param {any} password 
   * @returns {Observable<string[]>} 
   * @memberof RestProvider
   */
  loginWithMd5(mobile, password): Observable<string[]> {
    return this.getUrlReturn(this.apiUrlLoginWithMd5 + "?mobile=" + mobile + "&password=" + password);
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
