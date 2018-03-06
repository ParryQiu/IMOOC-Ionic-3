import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { BaseUI } from "../../common/baseui";
import { RestProvider } from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{

  questions: string[];
  errorMessage: any;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }

  getQuestions() {
    var loading = super.showLoading(this.loadingCtrl, "加载中...");
    this.rest.getQuestions()
      .subscribe(
      q => {
        this.questions = q;
        loading.dismiss();
      },
      error => this.errorMessage = <any>error);
  }

  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(questionId) {
    this.navCtrl.push(DetailsPage, { id: questionId });
  }

}
