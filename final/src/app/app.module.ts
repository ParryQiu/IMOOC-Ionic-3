import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { HeadfacePage } from '../pages/headface/headface';
import { QuestionPage } from '../pages/question/question';
import { DetailsPage } from '../pages/details/details';
import { AnswerPage } from '../pages/answer/answer';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { UserdatalistPage } from "../pages/userdatalist/userdatalist";
import { ScanPage } from "../pages/scan/scan";
import { VersionsPage } from "../pages/versions/versions";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { IonicStorageModule } from '@ionic/storage';
//导入的表情 Provider
import { EmojiProvider } from "../providers/emoji/emoji";
import { ComponentsModule } from '../components/components.module';

//导入四个外部加载进来的组件，具体的安装方法在 09-01 章节
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ChatserviceProvider } from '../providers/chatservice/chatservice';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';

import { RelativetimePipe } from "../pipes/relativetime/relativetime";
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    RelativetimePipe,
    UserdatalistPage,
    ScanPage,
    VersionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule, //全局需要导入 HTTP
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
    }),
    ComponentsModule,
    IonicStorageModule.forRoot() //全局定义 storage 的模块
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserdatalistPage,
    ScanPage,
    VersionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider, //rest 的定义导入
    File,
    Transfer,
    FilePath,
    Camera,
    QRScanner,
    EmojiProvider,
    ChatserviceProvider,
    SettingsProvider,
    AppVersion
  ]
})
export class AppModule { }
