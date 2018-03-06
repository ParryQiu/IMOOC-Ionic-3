import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI {

  errorMessage: any;
  notificationList: string[];

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

  ionViewDidLoad() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserNotifications(val)
          .subscribe(
          n => {
            this.notificationList = n;
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
