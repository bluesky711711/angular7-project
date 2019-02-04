import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, OnDestroy , Inject} from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observable, Subject } from 'rxjs';
import { Post } from '../../models/post';
import { BookmarkService } from '../../services/bookmark.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/auth.service';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.css']
})
export class SliderHomeComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  post$: Observable<Post[]>;
  portada: any = '/assets/img/utils/no_portada.png';
  bookmark = null;
  postUnique: Post[];
  category_class: any;
  showSpinner = true;

  constructor(@Inject(WINDOW) private window: Window, private auth: AuthService,
              private postService: PostService,
              private bookmarkService: BookmarkService,
              private toastr: ToastrService) { }

  async ngOnInit() {
    this.post$ = this.postService.homePost();
    // Convertimos el observable en una promesa para esperar que se resuelva...
    this.postUnique = await this.post$.pipe(first()).toPromise();
    // Si se resuelve...
    if (this.postUnique) {
      // Si esta logeado...
      if (this.auth.user$) {
        this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((auth) => {
          this.category_class = this.postUnique[0].category === 'tecnologia' || this.postUnique[0].category === 'emprendimiento' ||
          this.postUnique[0].category === 'productividad' || this.postUnique[0].category === 'liderazgo' ?
          this.postUnique[0].category : 'otro';
          this.showSpinner = false;
          if (auth) {
            // verificamos si el usuario lo sigue
            this.getBookmark(auth.uid, this.postUnique[0].uid);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async setBookmark(postId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.bookmarkService.setBookmark(user.uid, postId)
        .then(() => this.toastr.success('Guardado!', 'Piensa digital'))
        .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

  async delBookmark(postId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.bookmarkService.delBookmark(user.uid, postId)
        .then(() => this.toastr.success('Eliminado!', 'Piensa digital'))
        .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

  getBookmark(userId, postId) {
    this.bookmarkService.getBookmark(userId, postId).pipe(takeUntil(this.unsubscribe$)).subscribe(bookmark => this.bookmark = bookmark);
  }

  copyURL(url) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.window.location.hostname + '/post/' + url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('URL copiada al portapapeles!', 'Piensa digital');
  }

}
