import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { UserService } from '../../../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editor-follower',
  templateUrl: './editor-follower.component.html',
  styleUrls: ['./editor-follower.component.css']
})
export class EditorFollowerComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  userId = null;
  follow;
  user = [];

  constructor(private route: ActivatedRoute,
              public page: PaginationService,
              private userService: UserService) { }

  ngOnInit() {
     if (this.route.parent) {
       this.route.parent.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.userId = params.id);
     }
    this.page.reset();
    this.page.init('relationships', 'createdAt', 'followedId', this.userId, { reverse: true, prepend: false });
    this.page.data.pipe(takeUntil(this.unsubscribe$)).subscribe(followers => followers.map((follower, i) => {
      this.userService.getUser(follower.followerId).pipe(takeUntil(this.unsubscribe$)).subscribe(user => this.user[i] = user);
    }));
  }

  ngOnDestroy() {
    this.page.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

}
