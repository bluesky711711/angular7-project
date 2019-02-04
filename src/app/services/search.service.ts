import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private afs: AngularFirestore) { }


  search(offseter) {
    return offseter.pipe(
      filter(val => !!val), // filter empty strings
      switchMap(offset => {
        return this.afs.collection('posts', ref => ref
        // .where('state', '==', 'aprobado')
        .orderBy(`searchableIndex.${offset}`)
        // .orderBy('createdAt', 'desc')
        .limit(10)
        ).valueChanges();
      })
    );
  }

  searchCategory(category) {
    return this.afs.collection('posts', ref => ref
    .where('state', '==', 'aprobado')
    .where('category', '==', category)
    .orderBy('createdAt', 'desc')
    .limit(10)
    ).valueChanges();
  }

  searchTag(tag) {
    return this.afs.collection('posts', ref => ref
    .where('state', '==', 'aprobado')
    .where('tags', 'array-contains', tag)
    .orderBy('createdAt', 'desc')
    .limit(10)
    ).valueChanges();
  }


}
