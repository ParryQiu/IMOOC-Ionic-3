import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI {

  id: string;
  errorMessage: any;
  content: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public storage: Storage,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public toastCtrl: ToastController) {
    super();
    this.id = navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        var loading = super.showLoading(this.loadingCtrl, "发表中...")
        this.rest.answer(val, this.id, this.content)
          .subscribe(f => {
            if (f["Status"] == "OK") {
              loading.dismissAll();
              this.dismiss();
            }
            else {
              loading.dismissAll();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
          },
          error => this.errorMessage = <any>error);
      }
      else {
        super.showToast(this.toastCtrl, "请登录后发布回答...");
      }
    });
  }

}
