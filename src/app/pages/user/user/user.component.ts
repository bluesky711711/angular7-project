import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../core/auth.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../models/user';
import { takeUntil } from 'rxjs/operators';
import { routeAnimations } from '../../../core/animations/route.animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [routeAnimations]
})
export class UserComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  userId = null;
  user$: Observable<User>;
  user;
  userLogged = null;

  constructor(private auth: AuthService,
              private titleService: Title,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.titleService.setTitle('Usuario - Piensa Digital');
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.userId = params.get('id'));
  }

  ngOnInit() {
    this.user$ = this.userService.getUser(this.userId);
    this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(auth => {
      if (auth) {
        this.userLogged = auth.uid;
      }
    });
    // this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
