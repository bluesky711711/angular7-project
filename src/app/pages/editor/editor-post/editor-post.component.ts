import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-editor-post',
  templateUrl: './editor-post.component.html',
  styleUrls: ['./editor-post.component.css']
})
export class EditorPostComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  userId = null;

  constructor(private route: ActivatedRoute,
              public page: PaginationService) { }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.userId = params.id);
    }
    this.page.reset();
    this.page.init('posts', 'createdAt', 'user.uid', this.userId, { reverse: true, prepend: false }, 'aprobado');
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
