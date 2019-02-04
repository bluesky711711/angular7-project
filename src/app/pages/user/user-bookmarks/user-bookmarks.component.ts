import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ActivatedRoute} from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { BookmarkService } from '../../../services/bookmark.service';
import { PostService } from '../../../services/post.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-bookmarks',
  templateUrl: './user-bookmarks.component.html',
  styleUrls: ['./user-bookmarks.component.css']
})
export class UserBookmarksComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  showEmpty = true;
  userId = null;
  bookmark = [];
  post = [];
  category_class = [];
  // postId = [];

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    public page: PaginationService,
    private bookmarkService: BookmarkService,
    private postService: PostService,
    private toastr: ToastrService) {
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

  // async delBookmark(postId) {
  //   const user = await this.auth.isLoggedIn();
  //   if (user) {
  //     this.bookmarkService.delBookmark(user.uid, postId)
  //       .then(() => this.pageInit(this.userId))
  //       // .then(() => this.initialiseInvites())
  //       .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
  //   } else {
  //     this.toastr.success('Logeate para continuar!', 'Piensa digital');
  //   }
  // }

  // async getBookmark(postId, i) {
  //   const user = await this.auth.isLoggedIn();
  //   if (user) {
  //     this.bookmarkService.getBookmark(user.uid, postId).pipe(takeUntil(this.unsubscribe$)).subscribe(bookmark => {
  //       if (bookmark) {
  //         this.bookmark[i] = bookmark.postId;
  //       } else {
  //         this.bookmark[i] = null;
  //       }
  //     });
  //   } else {
  //     this.bookmark[i] = null;
  //   }
  // }

}
