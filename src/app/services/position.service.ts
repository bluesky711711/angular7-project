import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private positions$: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore) {
        this.positions$ = this.afs.collection('positions');
    }

    get positions() {
        return this.positions$.valueChanges();
    }
}
