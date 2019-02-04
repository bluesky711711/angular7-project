import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { PostService } from '../../../services/post.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editor-bookmarks',
  templateUrl: './editor-bookmarks.component.html',
  styleUrls: ['./editor-bookmarks.component.css']
})
export class EditorBookmarksComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  showEmpty = true;
  userId = null;
  bookmark = [];
  post = [];
  category_class = [];
  // postId = [];

  constructor(
    private route: ActivatedRoute,
    public page: PaginationService,
    private postService: PostService) {
    if (this.route.parent) {
      this.route.parent.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.userId = params.id);
    }
  }

  ngOnInit() {
    this.initialiseInvites();
  }

  ngOnDestroy() {
    this.page.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initialiseInvites() {
    this.pageInit(this.userId);
    this.page.data.pipe(takeUntil(this.unsubscribe$)).subscribe(bookmarks => {
      this.showEmpty = bookmarks.length > 0 ? false : true;
      bookmarks.map((bookmark, i) => {
        // if (bookmark) { this.postId[i] = bookmark.postId; }
        // this.getBookmark(bookmark.postId, i);
        this.postService.getPost(bookmark.postId).pipe(takeUntil(this.unsubscribe$)).subscribe(post => {
          this.post[i] = post;
          // this.category_class[i] = this.post[i].category === 'tecnologia' || this.post[i].category === 'emprendimiento' ||
          // this.post[i].category === 'productividad' || this.post[i].category === 'liderazgo' ? this.post[i].category : 'otro';
        });
      });
    });
  }

  pageInit(userId) {
    this.page.reset();
    this.page.init('bookmarks', 'createdAt', 'userId', userId, { reverse: true, prepend: false }, 'aprobado');
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

  trackByIdx(i) {
    return i;
  }

}
