import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editor-mypost',
  templateUrl: './editor-mypost.component.html',
  styleUrls: ['./editor-mypost.component.css']
})
export class EditorMypostComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  userId = null;
  userLogged = null;

  constructor(private route: ActivatedRoute,
              public page: PaginationService) { }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.userId = params.id);
      this.page.reset();
      this.page.init('posts', 'createdAt', 'user.uid', this.userId, { reverse: true, prepend: false });
    }
  }

  ngOnDestroy() {
    this.page.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByIdx(i) {
    return i;
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

}
