import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {
  transform(items: any[], value: string, label: string): any {
    if (!items) return [];
    if (!value) return items;
    if (value == '' || value == null) return 'No results found';
    console.log(items);
    let data = items.filter(e => e[label].toLowerCase().indexOf(value) > -1);
    if (data.length === 0) {
      return [-1];
    } else {
      return data;
    }
  }
}
