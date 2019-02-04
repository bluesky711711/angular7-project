import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
    name: 'toPosition'
})
export class ToPositionPipe implements PipeTransform {

    constructor(private afs: AngularFirestore) { }
    transform(value: any): any {
        return this.afs.doc(`positions/${value}`).valueChanges();
    }

}
