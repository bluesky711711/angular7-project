import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
    name: 'toTag'
})
export class ToTagPipe implements PipeTransform {

    constructor(private afs: AngularFirestore) { }
    transform(value: any): any {
        return this.afs.doc(`tags/${value}`).valueChanges();
    }

}
