import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the RelativetimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'relativetime',
})
export class RelativetimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return moment(value).toNow();
  }
}
