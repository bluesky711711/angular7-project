import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toFirstname'
})
export class ToFirstnamePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        const nombre = value.split(' ');
        const firstname = nombre[0];
        return firstname;
    }
}



