import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Bookmark } from '../models/bookmark';


@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    bookmarks$: AngularFirestoreCollection<any>;
    bookmarkDoc: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore) {
        this.bookmarks$ = this.afs.collection('bookmarks');
    }

    get bookmarks() {
        return this.bookmarks$.valueChanges();
    }

    getBookmark(userId, postId) {
        return this.afs.collection('bookmarks').doc<Bookmark>(`${userId}_${postId}`).valueChanges();
    }

    async setBookmark(userId, postId) {
        const createdAt = Date();
        const data = {
            createdAt: createdAt,
            userId: userId,
            postId: postId
        };
        this.bookmarkDoc = this.afs.doc(`bookmarks/${userId}_${postId}`);
        await this.bookmarkDoc.ref.get();
        return this.bookmarkDoc.set(data, { merge: true });
    }

    delBookmark(userId, postId) {
        return this.afs.doc(`bookmarks/${userId}_${postId}`).delete();
    }
}
