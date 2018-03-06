import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../../pages/details/details';

/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI {

  errorMessage: any;
  questions: string[];

  // datatype 外部传递进来，dataSourceType 本地接收之后的参数命名
  @Input('datatype') dataSourceType;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public storage: Storage) {
    super();
  }

  //这里没有 ionViewDidLoad 生命周期的函数
  ngAfterContentInit(){
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserQuestionList(val,this.dataSourceType)
          .subscribe(
          q => {
            this.questions = q;
            loading.dismissAll();
          },
          error => this.errorMessage = <any>error);
      }
    });
  }




  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}
