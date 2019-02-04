import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminEditorGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user$.pipe(
            take(1),
            map(user => {
                if (user && user.roles) {
                    return user.roles.admin || user.roles.editor ? true : false;
                }
            }),
            tap(isAdminEditor => {
                if (!isAdminEditor) {
                    this.router.navigate(['']);
                    console.error('Access denied - Admin and Editors only');
                }
            })
        );
    }
}
