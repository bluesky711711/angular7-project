import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories$: AngularFirestoreCollection<any>;
  categoryDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.categories$ = this.afs.collection('categories');
  }

  get categories() {
    return this.categories$.valueChanges();
  }

  setCategory(data) {
    this.categoryDoc = this.afs.doc(`categories/${data.uid}`);
    this.categoryDoc.ref.get().then(() => {
        this.categoryDoc.set(data, { merge: true });
    });
  }

  setSubCategory(data) {
    this.categoryDoc = this.afs.doc(`categories/${data.cat}`);
    this.categoryDoc.ref.get().then(() => {
      this.categoryDoc.update({ subcategories: firebase.firestore.FieldValue.arrayUnion({ uid: data.sub.toLowerCase(), value: data.sub})});
    });
  }

  delCategory(uid) {
    this.categories$.doc(uid).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }
}
