import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toReadTime'
})
export class ToReadTimePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let words, time, minutes;
        if (value) {
            words = value.split(' ').length;
            time = (60 * words / 250);
            // tslint:disable-next-line:no-bitwise
            minutes = ~~(time / 60);
            // seconds = Math.ceil(time - minutes * 60);
            // tslint:disable-next-line:no-unused-expression
            minutes = minutes !== 0 ? minutes + ' min' : '1 min';
            return minutes + ' de lectura';
        }
    }
}



