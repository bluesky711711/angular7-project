import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AgeService {
    private ages$: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore) {
        this.ages$ = this.afs.collection('ages');
    }

    get ages() {
        return this.ages$.valueChanges();
    }
}
