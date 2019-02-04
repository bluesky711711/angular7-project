import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class OccupationService {
    private occupations$: AngularFirestoreCollection<any>;

    constructor(private afs: AngularFirestore) {
        this.occupations$ = this.afs.collection('occupations');
    }

    get occupations() {
        return this.occupations$.valueChanges();
    }
}
