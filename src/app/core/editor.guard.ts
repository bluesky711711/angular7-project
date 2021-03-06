import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class EditorGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user$.pipe(
            take(1),
            map(user => user && user.roles.editor  || user.roles.contributor ? true : false),
            tap(isEditor => {
                if (!isEditor) {
                    this.router.navigate(['']);
                    console.error('Access denied - Editors only');
                }
            })
        );
    }
}
