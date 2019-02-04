import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { scan, take, tap } from 'rxjs/operators';
import { Post } from '../models/post';

// Options to reproduce firestore queries consistently
interface QueryConfig {
    path: string; // path to collection
    condition: string;
    param: string;
    field: string; // field to orderBy
    state?: string;
    limit?: number; // limit per query
    reverse?: boolean; // reverse order?
    prepend?: boolean; // prepend to source?
}

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    // Source data
    private _done = new BehaviorSubject(false);
    private _loading = new BehaviorSubject(false);
    private _data = new BehaviorSubject([]);

    private query: QueryConfig;

    // Observable data
    data: Observable<any> = null;
    done: Observable<boolean> = this._done.asObservable();
    loading: Observable<boolean> = this._loading.asObservable();


    constructor(private afs: AngularFirestore) { }

    dev() {
        return this.afs.collection('posts', ref => ref
            .where('state', '==', 'aprobado')
            .orderBy('createdAt', 'desc')
        ).valueChanges();
    }

    // Initial query sets options and defines the Observable
    init(path, field, condition?, param?, opts?, state?) {
        this.query = {
            path,
            field,
            condition,
            param,
            limit: 10,
            reverse: false,
            prepend: false,
            state,
            ...opts
        };
        const first = this.afs.collection(this.query.path, ref => {
            if (this.query.path === 'posts') {
                if (this.query.condition) {
                    if (state === 'aprobado') {
                        return ref
                            .where(this.query.condition, '==', this.query.param)
                            .where('state', '==', this.query.state)
                            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                            .limit(this.query.limit);
                    } else {
                        return ref
                            .where(this.query.condition, '==', this.query.param)
                            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                            .limit(this.query.limit);
                    }
                } else {
                    return ref
                        .where('state', '==', this.query.state)
                        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                        .limit(this.query.limit);
                }
            } else {
                if (this.query.condition) {
                    return ref
                        .where(this.query.condition, '==', this.query.param)
                        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                        .limit(this.query.limit);
                } else {
                    return ref
                        .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                        .limit(this.query.limit);
                }
            }
        });
        this.mapAndUpdate(first);

        // Create the observable array for consumption in components
        this.data = this._data.asObservable().pipe(
            scan((acc, val) => {
                return this.query.prepend ? val.concat(acc) : acc.concat(val);
            }));
    }


    // Retrieves additional data from firestore
    more() {
        const cursor = this.getCursor();
        if (cursor) {
            const more = this.afs.collection(this.query.path, ref => {
                if (this.query.path === 'posts') {
                    if (this.query.condition) {
                        return ref
                            .where(this.query.condition, '==', this.query.param)
                            .where('state', '==', 'aprobado')
                            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                            .limit(this.query.limit)
                            .startAfter(cursor);
                    } else {
                        return ref
                            .where('state', '==', 'aprobado')
                            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                            .limit(this.query.limit)
                            .startAfter(cursor);
                    }
                } else {
                    if (this.query.condition) {
                        return ref
                            .where(this.query.condition, '==', this.query.param)
                            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                            .limit(this.query.limit)
                            .startAfter(cursor);
                    } else {
                        return ref
                            .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                            .limit(this.query.limit)
                            .startAfter(cursor);
                    }
                }
            });
            this.mapAndUpdate(more);
        }
    }


    // Determines the doc snapshot to paginate query
    private getCursor() {
        const current = this._data.value;
        if (current.length) {
            return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
        }
        return null;
    }


    // Maps the snapshot to usable format the updates source
    private mapAndUpdate(col: AngularFirestoreCollection<any>) {

        if (this._done.value || this._loading.value) { return; }

        // loading
        this._loading.next(true);

        // Map snapshot with doc ref (needed for cursor)
        return col.snapshotChanges().pipe(
            tap(arr => {
                let values = arr.map(snap => {
                    const data = snap.payload.doc.data();
                    const doc = snap.payload.doc;
                    return { ...data, doc };
                });
                // If prepending, reverse array
                values = this.query.prepend ? values.reverse() : values;
                // update source with new values, done loading
                this._data.next(values);
                this._loading.next(false);

                // no more values, mark done
                if (!values.length) {
                    this._done.next(true);
                }
            }), take(1))
            .subscribe();

    }


    // Reset the page
    reset() {
        this._data.next([]);
        this._done.next(false);
    }


}
