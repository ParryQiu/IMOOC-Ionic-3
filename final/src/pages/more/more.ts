import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { UserPage } from '../user/user';
import { UserdatalistPage } from "../userdatalist/userdatalist";
import { SettingsProvider } from '../../providers/settings/settings';
import { ScanPage } from "../scan/scan";
import { VersionsPage } from "../versions/versions";
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI {

  public notLogin: boolean = true;
  public logined: boolean = false;
  headface: string;
  userinfo: string[];
  selectedTheme: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private settings: SettingsProvider,
    public loadCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage) {
    super();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  showModal() {
    let modal = this.modalCtrl.create(LoginPage);
    //关闭后的回调
    modal.onDidDismiss(() => {
      this.loadUserPage();
    });
    modal.present();
  }

  ionViewDidLoad() {
    this.loadUserPage();
  }

  loadUserPage() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        //加载用户数据
        var loading = super.showLoading(this.loadCtrl, "加载中...");
        this.rest.getUserInfo(val)
          .subscribe(
          userinfo => {
            this.userinfo = userinfo;
            this.headface = userinfo["UserHeadface"] + "?" + (new Date()).valueOf();
            this.notLogin = false;
            this.logined = true;
            loading.dismiss();
          }
          );
      }
      else {
        this.notLogin = true;
        this.logined = false;
      }
    });
  }

  gotoDataList(type) {
    this.navCtrl.push(UserdatalistPage, { "dataType": type })
  }

  gotoUserPage() {
    this.navCtrl.push(UserPage);
  }

  /**
   * 跳转到扫描二维码的页面，加上 animate = false 的参数是为了
   * 相机能够在整个屏幕中显示，如果不加，相机就出不来。
   * animate 的参数默认值为 true
   * 
   * @memberof MorePage
   */
  gotoScanQRCode() {
    this.navCtrl.push(ScanPage, null, { "animate": false });
  }

  toggleChangeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    }
    else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

  gotoVersions() {
    this.navCtrl.push(VersionsPage);
  }
}
