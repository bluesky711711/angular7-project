import { AngularFirestore } from '@angular/fire/firestore';

import { combineLatest, pipe, of, defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

export const leftjoin = (
    afs: AngularFirestore,
    field,
    collection,
    operation,
    field2?,
    limit = 100,
) => {
    field2 = field2 ? field2 : field;
    return source =>
        defer(() => {
            // Operator state
            let collectionData;

            // Track total num of joined doc reads
            let totalJoins = 0;

            return source.pipe(
                switchMap(data => {
                    // Clear mapping on each emitted val ;
                    // Save the parent data state
                    collectionData = data as any[];
                    const reads$ = [];
                    for (const doc of collectionData) {
                        // Push doc read to Array
                        if (doc[field]) {
                            // Perform query on join key, with optional limit
                            const q = ref => ref
                            .where(field2, operation, doc[field])
                            .where('state', '==', 'aprobado')
                            .orderBy('createdAt', 'desc')
                            .limit(limit);

                            reads$.push(afs.collection(collection, q).valueChanges());
                        } else {
                            reads$.push(of([]));
                        }
                    }

                    return combineLatest(reads$);
                }),
                map(joins => {
                    return collectionData.map((v, i) => {
                        totalJoins += joins[i].length;
                        return { ...v, [collection]: joins[i] || null };
                    });
                }),
                tap(final => {
                    // console.log(
                    //     `Queried ${(final as any).length}, Joined ${totalJoins} docs`
                    // );
                    totalJoins = 0;
                })
            );
        });
};
