import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ViewController, ToastController, ModalController, LoadingController, ActionSheetController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

//导入四个外部加载进来的组件，具体的安装方法在 09-01 章节
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any; //导入第三方的库定义到 TS 项目中

//@IonicPage()
@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

  userId: string;
  errorMessage: string;
  lastImage: string = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    public transfer: Transfer,
    public file: File,
    public filePath: FilePath,
    public platform: Platform,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
    super();
  }

  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从图片库中选择',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '使用相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    //定义相机的一些参数
    var options = {
      quality: 100, //图片的质量
      sourceType: sourceType,
      saveToPhotoAlbum: false, //是否保存拍摄的照片到相册中去
      correctOrientation: true //是否纠正拍摄的照片的方向
    };

    //获取图片的方法
    this.camera.getPicture(options).then((imagePath) => {
      //特别处理 android 平台的文件路径问题
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath) //获取 android 平台下的真实路径
          .then(filePath => {
            //获取正确的路径
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            //获取正确的文件名
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      }
      else {
        //获取正确的路径
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //获取正确的文件名
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      super.showToast(this.toastCtrl, "选择图片出现错误，请在 App 中操作或检查相关权限。");
    });
  }

  //将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
    }, error => {
      super.showToast(this.toastCtrl, "存储图片到本地图库出现错误。");
    });
  }

  //为文件生成一个新的文件名
  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg"; //拼接文件名
    return newFileName;
  }

  //处理图片的路径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return normalizeURL(cordova.file.dataDirectory + img);
    }
  }

  uploadImage() {
    var url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.userId + ".jpg"; //定义上传后的文件名

    //fileTransfer 上传的参数
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { 'fileName': filename, 'userid': this.userId }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    var loading = super.showLoading(this.loadingCtrl, "上传中...");

    //开始正式地上传
    fileTransfer.upload(targetPath, url, options).then(data => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传成功。");
      //在用户看清弹窗提示后进行页面的关闭
      setTimeout(() => {
        this.viewCtrl.dismiss();
      }, 3000);
    }, err => {
      loading.dismiss();
      super.showToast(this.toastCtrl, "图片上传发生错误，请重试。");
    });
  }
}
