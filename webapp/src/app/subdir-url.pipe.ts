import { Pipe, PipeTransform } from '@angular/core';
import {url} from './settings';

@Pipe({
  name: 'url'
})
export class SubdirUrlPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.startsWith('/')) {
      return '/' + url(value.substring(1));
    } else {
      return url(value);
    }
  }

}
