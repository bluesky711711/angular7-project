import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  userLogged;
  rol: any;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.userLogged = this.auth.getUserId();
    // this.userLogged.then(user => this.getRol(user.uid)).cath(e => console.log(e));
  }

  addUser(userData) {
    this.afs.collection('users').add(userData).then(() => {
      console.log('Done');
    });
  }

  getUsers() {
    return this.afs.collection('users').valueChanges();
  }

  getUser(uid) {
    this.userDoc = this.afs.doc<User>(`users/${uid}`);
    return this.user = this.userDoc.valueChanges();
  }

  getRol(uid) {
    this.afs.doc<User>(`users/${uid}`).valueChanges().subscribe(user => {
      if (user.roles.admin) {
        this.rol = 'admin';
      } else if (user.roles.editor && !user.roles.admin) {
        this.rol = 'editor';
      } else if (user.roles.contributor && !user.roles.editor && !user.roles.admin) {
        this.rol = 'contributor';
      } else {
        this.rol = 'subscriber';
      }
    });
  }


  updateRol(user) {
    if (user.rol === 'admin') {
      if (this.rol === 'admin') {
        user.val = user.val === false ? true : false;
        return this.afs.collection('users').doc(user.uid).update({ 'roles.admin': user.val });
      } else {
        return console.log('Necesitas ser administrador para asignar un admin');
      }
    }
    if (user.rol === 'editor') {
      user.val = user.val === false ? true : false;
      const visitCount = user.visitCount ? user.visitCount : 0;
      const followerCount = user.followerCount ? user.followerCount : 0;
      return this.afs.collection('users').doc(user.uid).update({
        'roles.editor': user.val,
        'visitCount': visitCount,
        'followerCount': followerCount
      });
    }
    if (user.rol === 'contributor') {
      user.val = user.val === false ? true : false;
      const visitCount = user.visitCount ? user.visitCount : 0;
      const followerCount = user.followerCount ? user.followerCount : 0;
      return this.afs.collection('users').doc(user.uid).update({
        'roles.contributor': user.val,
        'visitCount': visitCount,
        'followerCount': followerCount
      });
    }
    if (user.rol === 'subscriber') {
      user.val = user.val === false ? true : false;
      return this.afs.collection('users').doc(user.uid).update({ 'roles.subscriber': user.val });
    }
  }

  updateUser(userId, data) {
    return this.afs.doc<User>(`users/${userId}`).update(data);
  }

  updateImageUser(userId, image) {
    return this.afs.doc<User>(`users/${userId}`).update({image: image});
  }
}
