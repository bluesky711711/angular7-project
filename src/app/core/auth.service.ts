import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    public user$: Observable<User>;
    userDoc: AngularFirestoreDocument<any>;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private router: Router
                ) {
        this.user$ = this.getUser();
    }

    getUser() {
        return this.afAuth.authState.pipe(
            switchMap(user => {
                if (user) {
                    this.userDoc = this.afs.doc<User>(`users/${user.uid}`);
                    return this.userDoc.valueChanges();
                } else {
                    return of(null);
                }
            }));
    }

    isLoggedIn() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    // Get the user ID Logged
    getUserId() {
        // if (this.userDoc) {
        //     return this.userDoc.ref.id;
        // }
        // else {
            return this.user$.pipe(first()).toPromise();
        // }
    }

    // Login/Google
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    // Login/Facebook
    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    // Login/Twitter
    twitterLogin() {
        const provider = new firebase.auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.user$ = this.getUser();
                this.updateUserData(credential);
            });
            // .catch((err) => console.log(err));
    }


    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.user$ = null;
        }, (error) => {
            console.log(error);
        });
    }

    private updateUserData(credential) {
        const user = credential.user;
        const providerId = credential.credential.providerId;
        const photoURL = providerId === 'facebook.com' ? user.photoURL + '?type=large' : user.photoURL;
        const data: User = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: photoURL,
            email: user.email,
            roles: {
                subscriber: true
            }
        };
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        userRef.ref.get().then((documentSnapshot) => {
            if (!documentSnapshot.exists) {
                return userRef.set(data, { merge: true }).then(() => {
                    this.router.navigate(['/topics']);
                });
            } else {
                return userRef.set(data, { merge: true });
            }
        });
    }

    canRead(user: User): boolean {
        const allowed = ['admin', 'editor', 'contributor', 'subscriber'];
        return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
        const allowed = ['admin', 'editor', 'contributor'];
        return this.checkAuthorization(user, allowed);
    }

    canDelete(user: User): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }


    private checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) { return false; }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }

}
