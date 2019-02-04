import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toString'
})
export class ToStringPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        // const div = document.createElement('div');
        // div.innerHTML = value;
        // const text = div.textContent || div.innerText || ' ';
        // return text;
        if (value) {
            return value.replace(/<\/?[^>]+(>|$)/g, ' ');
        }
    }
}
