import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
    name: 'toPost'
})
export class ToPostPipe implements PipeTransform {

    constructor(private afs: AngularFirestore) { }
    transform(value: any): any {
        return this.afs.doc(`posts/${value}`).valueChanges();
    }

}
