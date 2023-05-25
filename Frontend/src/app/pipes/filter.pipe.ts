import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FiltersPipe implements PipeTransform {
  transform(value: any[], filsterString: string, propName: string): any[] {
    const resultArray = [];
    if (value) {
      if (value.length === 0 || filsterString === '' || propName === '') {
        return value;
      }
      for (const item of value) {
        if (item[propName] === filsterString) {
          resultArray.push(item);
        }
      }
    }
    return resultArray;
  }
}
