import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Relationship } from '../models/relationship';
import { EditorService } from './editor.service';
import { map, take, first } from 'rxjs/operators';
import { Subscriber, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FollowerService {
    private relationships$: AngularFirestoreCollection<any>;
    followersCount;

    constructor(private afs: AngularFirestore, private editorService: EditorService) {
        this.relationships$ = this.afs.collection('relationships');
    }

    get relationships() {
        return this.relationships$.valueChanges();
    }

    setFollow(followerId, followedId) {
        const createdAt = new Date();
        const data = {
            createdAt: createdAt,
            followerId: followerId,
            followedId: followedId
        };
        return this.afs.doc(`relationships/${followerId}_${followedId}`).set(data);
    }

    setUnfollow(followerId, followedId) {
        return this.afs.doc(`relationships/${followerId}_${followedId}`).delete();
    }

    getFollow(followerId, followedId) {
        // tslint:disable-next-line:max-line-length
        return this.afs.collection('relationships').doc<Relationship>(`${followerId}_${followedId}`).valueChanges().pipe(first()).toPromise();
    }

    getFollowRT(followerId, followedId) {
        return this.afs.collection('relationships').doc<Relationship>(`${followerId}_${followedId}`).valueChanges();
    }
}
