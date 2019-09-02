import { Pipe, PipeTransform } from '@angular/core';
import { UserPage } from "../pages/User/User.page";
import * as _ from 'lodash';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: UserPage[], column: string, order = ''): UserPage[] {
    if (!value || !column || column === '' || order === '') { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    return _.orderBy(value, [column], [order]);
  }

}