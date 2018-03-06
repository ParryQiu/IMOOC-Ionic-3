import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'relativetime',
})
export class RelativetimePipe implements PipeTransform {
 
  /**
   * 将日期格式转化成对应时间格式
   * 
   * @param {string} value 
   * @param {any} args 
   * @returns 
   * @memberof RelativetimePipe
   */
  transform(value: string, ...args) {
    return moment(value).toNow();
  }
}
