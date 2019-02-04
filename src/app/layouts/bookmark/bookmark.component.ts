import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BookmarkService } from '../../services/bookmark.service';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit, OnDestroy {
  @Input() postId: string;
  private unsubscribe$: Subject<void> = new Subject<void>();
  bookmark;

  constructor(private auth: AuthService,
              private bookmarkService: BookmarkService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getBookmark(this.postId);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async setBookmark() {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.bookmarkService.setBookmark(user.uid, this.postId)
        .then(() => this.toastr.success('Guardado!', 'Piensa digital'))
        .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

  async delBookmark() {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.bookmarkService.delBookmark(user.uid, this.postId)
        .then(() => this.toastr.success('Eliminado!', 'Piensa digital'))
        .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

  async getBookmark(postId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.bookmarkService.getBookmark(user.uid, postId).pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(bookmark => {
        if (bookmark) {
          this.bookmark = bookmark.postId;
        } else {
          this.bookmark = null;
        }
      });
    } else {
      this.bookmark = null;
    }
  }
}
