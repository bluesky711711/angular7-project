import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Editor } from '../models/editor';
import { Observable, of } from 'rxjs';
import { map, switchMap, first  } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  editorDoc: AngularFirestoreDocument<Editor>;
  editor$: Observable<Editor>;
  public count: any;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.editor$ = this.afAuth.authState.pipe(
      switchMap(editor => {
        if (editor) {
          this.editorDoc = this.afs.doc<Editor>(`users/${editor.uid}`);
          return this.editorDoc.valueChanges();
        } else {
          return of(null);
        }
      }));
   }

  isLoggedIn() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getEditor(uid) {
    this.editorDoc = this.afs.doc<Editor>(`users/${uid}`);
    return this.editor$ = this.editorDoc.valueChanges();
  }

  getEditorUnique(uid) {
    this.editorDoc = this.afs.doc<Editor>(`users/${uid}`);
    return this.editorDoc.valueChanges().pipe(first()).toPromise();
  }

  getEditorsHome() {
    return this.afs.collection<Editor>('users', ref => ref
      .where('roles.contributor', '==', true)
      .orderBy('visitCount', 'desc')
      .limit(4)).valueChanges();
  }

  getEditors() {
    return this.afs.collection<Editor>('users', ref => ref
      .where('roles.contributor', '==', true)
      .orderBy('visitCount', 'desc')).valueChanges();
  }

  getPosts(userId) {
    return this.afs.collection('posts', ref => ref
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')).valueChanges();
  }

  updateEditor(userId, data) {
    return this.afs.doc<Editor>(`users/${userId}`).update(data);
  }

  updateImageEditor(userId, image) {
    return this.afs.doc<Editor>(`users/${userId}`).update({image: image});
  }

  setFollowerCount(userId, followerCount, val) {
    val ? followerCount++ : followerCount--;
    if (followerCount < 0) { followerCount = 0; }
    return this.afs.doc<Editor>(`users/${userId}`).update({ followerCount: followerCount });
  }

  setVisit(userId, visitCount) {
    visitCount++;
    this.afs.doc<Editor>(`users/${userId}`).update({ visitCount: visitCount });
  }
}
