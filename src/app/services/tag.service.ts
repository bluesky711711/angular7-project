import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { RelationshipsTags } from '../models/relationshipTopic';
import { first } from 'rxjs/operators';
import { Tag } from '../models/tag';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tags$: AngularFirestoreCollection<any>;
  tagDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.tags$ = this.afs.collection('tags');
  }

  get tags() {
    return this.tags$.valueChanges();
  }

  get tagsActive() {
    return this.afs.collection<Tag>('tags', ref => ref
    .where('state', '==', 'aprobado')).valueChanges();
  }

  setTags(tags) {
    // Leemos el array de tags
    for (let tag of tags) {
      // Convertimos el tag en minusculas para buscar los documentos
      tag = tag.toLowerCase();
      // Instanciamos la consulta
      this.tagDoc = this.afs.doc(`tags/${tag}`);
      // Obtenemos los id
      this.tagDoc.ref.get().then((documentSnapshot) => {
        // Si el documento no existe...
        if (!documentSnapshot.exists) {
          if (documentSnapshot.id === tag) {
            // Convertimos el tag con mayuscula principal
            const value = tag.charAt(0).toUpperCase() + tag.slice(1);
            // Insertamos
            return this.afs.doc(`tags/${tag}`).set({uid: tag, value: value, state: 'pendiente'});
          }
        }
      });
    }
  }

  setTag(data) {
    this.tagDoc = this.afs.doc(`tags/${data.uid}`);
    this.tagDoc.ref.get().then(() => {
      this.tagDoc.set(data, { merge: true });
    });
  }

  delTag(uid) {
    this.tags$.doc(uid).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }

  // setFollow(userId, tagId) {
  //   const createdAt = new Date();
  //   const data = {
  //     createdAt: createdAt,
  //     userId: userId,
  //     tagId: tagId
  //   };
  //   return this.afs.doc(`relationshipsTags/${userId}_${tagId}`).set(data);
  // }

  // setUnfollow(userId, tagId) {
  //   return this.afs.doc(`relationshipsTags/${userId}_${tagId}`).delete();
  // }

  // getFollow(userId, tagId) {
  // tslint:disable-next-line:max-line-length
  //   return this.afs.collection('relationshipsTags').doc<RelationshipsTags>(`${userId}_${tagId}`).valueChanges().pipe(first()).toPromise();
  // }

  // getFollowRT(userId, tagId) {
  //   return this.afs.collection('relationshipsTags').doc<RelationshipsTags>(`${userId}_${tagId}`).valueChanges();
  // }

  aprobTag(uid, val) {
    val = val === 'pendiente' ? 'aprobado' : val === 'aprobado' ? 'declinado' : 'pendiente';
    return this.afs.collection('tags').doc(uid).update({ 'state': val });
  }
}
