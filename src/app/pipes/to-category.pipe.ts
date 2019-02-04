import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
    name: 'toCategory'
})
export class ToCategoryPipe implements PipeTransform {

    constructor(private afs: AngularFirestore) { }
    transform(value: any): any {
        return this.afs.doc(`categories/${value}`).valueChanges();
    }

}
