import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RelationshipTopic } from '../models/relationshipTopic';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topics$: AngularFirestoreCollection<any>;
  tagDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    this.topics$ = this.afs.collection('categories');
  }

  get topics() {
    return this.topics$.valueChanges();
  }

  setFollow(userId, topicId) {
    const createdAt = new Date();
    const data = {
      createdAt: createdAt,
      userId: userId,
      topicId: topicId
    };
    return this.afs.doc(`relationshipTopic/${userId}_${topicId}`).set(data);
  }

  setUnfollow(userId, topicId) {
    return this.afs.doc(`relationshipTopic/${userId}_${topicId}`).delete();
  }

  getFollow(userId, topicId) {
    return this.afs.collection('relationshipTopic').doc<RelationshipTopic>(`${userId}_${topicId}`).valueChanges().pipe(first()).toPromise();
  }

  getFollowRT(userId, topicId) {
    return this.afs.collection('relationshipTopic').doc<RelationshipTopic>(`${userId}_${topicId}`).valueChanges();
  }
}
