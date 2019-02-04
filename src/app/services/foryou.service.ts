import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, of  } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { Relationship } from '../models/relationship';
import { leftjoin } from './leftjoin';
import { RelationshipTopic } from '../models/relationshipTopic';

@Injectable({
    providedIn: 'root'
})
export class ForyouService {
    editorsOrTagsPosts$: Observable<any[]>;
    posts$: Observable<any>;
    postFollow = [];

    constructor(private afs: AngularFirestore) { }

    test(userId) {
        return this.afs.collection<Relationship>('relationships', ref => ref.where('followerId', '==', userId)).valueChanges()
            .pipe(
                leftjoin(this.afs, 'followedId', 'posts', '==', 'user.uid')
            );
    }

    async getPosts(userId) {
        // A las relaciones le añadimos el array de los post de la persona que se sigue
        const followedsPosts$ = this.getFollowedPost(userId);
        // A los topics que seguimos le añadimos los posts relacionados con el topic
        const topicPosts$ = this.getTopicPost(userId);
        // Convertimos los observables en promesas
        const f = await followedsPosts$.pipe(first()).toPromise();
        const t = await topicPosts$.pipe(first()).toPromise();
        // Validamos las promesas...
        if (!f && t) {// Si solo tiene topics
            return topicPosts$;
        } else if (!t && f) {// Si solo tiene contribuidores
            return followedsPosts$;
        } else if (f && t) {// Si tiene los 2 combinamos los observables
            // Combinamos los 2 observables...
            return this.combine(followedsPosts$, topicPosts$);
        }
    }

    getFollowedPost (userId) {
        return this.afs.collection<Relationship>('relationships', ref => ref.where('followerId', '==', userId)).valueChanges()
        .pipe(
            switchMap(post => {
                if (post.length > 0) {
                    return this.afs.collection<Relationship>('relationships', ref => ref.where('followerId', '==', userId)).valueChanges()
                        .pipe(leftjoin(this.afs, 'followedId', 'posts', '==', 'user.uid'));
                } else {
                    return of(null);
                }
            })
        );
    }

    getTopicPost (userId) {
        return this.afs.collection<RelationshipTopic>('relationshipTopic', ref => ref.where('userId', '==', userId)).valueChanges()
        .pipe(
            switchMap(post => {
                if (post.length > 0) {
                    // tslint:disable-next-line:max-line-length
                    return this.afs.collection<RelationshipTopic>('relationshipTopic', ref => ref.where('userId', '==', userId)).valueChanges()
                        .pipe(leftjoin(this.afs, 'tagId', 'posts', 'array-contains', 'tags'));
                } else {
                    return of(null);
                }
            })
        );
    }

    combine(followedsPosts$, topicPosts$) {
        // Combinamos los 2 observables...
        return this.editorsOrTagsPosts$ = combineLatest(
            followedsPosts$,
            topicPosts$,
            // Creamos una funcion para que no devuelva post repetidos
            (followedsPosts: any, topicPosts: any) => {
                const followeds = [];
                const tags = [];

                if (!followedsPosts || !topicPosts) {
                    return false;
                }
                // Obtenemos solo los posts
                followedsPosts.map(followed => {
                    followed.posts.map(f => {
                        followeds.push(f);
                    });
                });
                // Obtenemos solo los posts
                topicPosts.map(tag => {
                    tag.posts.map(t => {
                        tags.push(t);
                    });
                });
                // Reasignamos los observables con los nuevos array
                followedsPosts = followeds;
                topicPosts = tags;
                return followedsPosts.reduce((acc, actual) => {
                    // Validamos que no haya repetidos
                    if (!acc.some(tag => tag.uid === actual.uid)) {
                        acc = [...acc, actual];
                    }
                    return acc;
                }, [...topicPosts]);
            }
        );
    }
}
