import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<string>

  constructor(public http: Http) {
    this.theme = new BehaviorSubject('light-theme');
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

}
