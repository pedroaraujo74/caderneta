import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSearch'
})

export class FilterPipe implements PipeTransform {
    transform(feedArray: any, term: any): any {
        if (term === undefined) return feedArray;
        return feedArray.filter(function (item) {
            return item.title.toLowerCase().includes(term.toLowerCase());
        })
    }
}
