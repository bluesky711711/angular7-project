import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Pipe({
  name: 'toUser'
})
export class ToUserPipe implements PipeTransform {

  constructor(private afs: AngularFirestore) { }
  transform(value: any): any {
    return this.afs.doc(`users/${value}`).valueChanges();
  }

}
