import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the VersionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-versions',
  templateUrl: 'versions.html',
})
export class VersionsPage {

  appName: string;
  packageName: string;
  versionCode: string;
  versionNumber: string;

  constructor(public navCtrl: NavController,
    private appVersion: AppVersion,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.appVersion.getAppName().then(v => {
      this.appName = v;
    });

    this.appVersion.getPackageName().then(v => {
      this.packageName = v;
    });

    this.appVersion.getVersionCode().then(v => {
      this.versionCode = v;
    });

    this.appVersion.getVersionNumber().then(v => {
      this.versionNumber = v;
    });
  }

}
