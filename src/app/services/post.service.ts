import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Post } from '../models/post';
import { TagService } from './tag.service';

import { Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post>;
  contador;
  subscription: any;

  constructor(private afs: AngularFirestore, private tagService: TagService, private toastr: ToastrService) { }

  // Obtiene todos los posts
  getPosts() {
    return this.afs.collection<Post>('posts').valueChanges();
  }

  // Crea un nuevo post
  createPost(data) {
    this.postDoc = this.afs.doc<Post>(`posts/${data.uid}`);
    return this.postDoc.ref.get().then(doc => {
      if (!doc.exists) {
        this.postDoc.set(data);
        this.tagService.setTags(data.tags);
      } else {
        this.toastr.error('Ya existe un post con esa URL!', 'Piensa digital');
      }
    });
  }

  // Actualiza un post
  updatePost(documentId: string, data) {
    const postDoc = this.afs.collection('posts').doc(documentId);
    return postDoc.update(data).then(() => {
      this.tagService.setTags(data.tags);
    });
  }

  // Obtiene un post
  getPost(documentId: string) {
    return this.afs.collection('posts').doc<Post>(documentId).valueChanges();
  }

  getPostUnique(documentId: string) {
    return this.afs.collection('posts').doc<Post>(documentId).valueChanges().pipe(first()).toPromise();
  }


  aprobPost(uid, val) {
    val = val === 'pendiente' ? 'aprobado' : val === 'aprobado' ? 'declinado' : 'pendiente';
    return this.afs.collection('posts').doc(uid).update({ 'state': val });
  }

  setVisit(postId, visitCount) {
    visitCount++;
    this.afs.doc<Post>(`posts/${postId}`).update({ visitCount: visitCount });
  }

  moreReads(limit) {
    limit = limit - 1;
    const today = new Date();
    const days = 1000 * 60 * 60 * 24 * 15;
    const rest = today.getTime() - days;
    const date_start = new Date(rest);
    return this.afs.collection<Post>('posts', ref => ref
    .where('createdAt', '>=', date_start)
    .where('state', '==', 'aprobado')
    ).valueChanges().pipe(map((data) => {
      const p = data.sort((a, b) => b.visitCount - a.visitCount);
      const arr = [];
      p.map((d, i) => {
        if (i <= limit) {
          arr.push(d);
        }
      });
      return arr;
    }));
  }

  trending(limit) {
    limit = limit - 1;
    const today = new Date();
    const days = 1000 * 60 * 60 * 24 * 7;
    const rest = today.getTime() - days;
    const date_start = new Date(rest);
    return this.afs.collection<Post>('posts', ref => ref
      .where('createdAt', '>=', date_start)
      .where('state', '==', 'aprobado')
    ).valueChanges().pipe(map((data) => {
      const p = data.sort((a, b) => b.visitCount - a.visitCount);
      const arr = [];
      p.map((d, i) => {
        if (i <= limit) {
          arr.push(d);
        }
      });
      return arr;
    }));
  }

  recommendPost(uid, val) {
    val = val ? false : true;
    return this.afs.collection('posts').doc(uid).update({ 'recommended': val });
  }

  recomendedPosts() {
    return this.afs.collection<Post>('posts', ref => ref
      .where('recommended', '==', true)
      .where('state', '==', 'aprobado')
      .orderBy('createdAt', 'desc')
      .limit(3)
    ).valueChanges();
  }

  homePost() {
    return this.afs.collection<Post>('posts', ref => ref
      .where('homePost', '==', true)
      .where('state', '==', 'aprobado')
      .orderBy('createdAt', 'desc')
      .limit(1)
    ).valueChanges();
  }

  setHomePost(uid, val) {
    val = val ? false : true;
    return this.afs.collection('posts').doc(uid).update({ 'homePost': val });
  }

}
