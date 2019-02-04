import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, OnDestroy , Inject} from '@angular/core';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FollowerService } from '../../services/follower.service';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { EditorService } from '../../services/editor.service';
import { Editor } from '../../models/editor';
import { BookmarkService } from '../../services/bookmark.service';
import { ToastrService } from 'ngx-toastr';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  showSpinner = true;
  post$: Observable<Post>;
  post: Post;
  editor: Editor;
  postId;
  image;
  userId;
  followed = null;
  identifier;
  navigationSubscription;
  bookmark = null;
  category_class;

  constructor(@Inject(WINDOW) private window: Window, private route: ActivatedRoute,
              private router: Router,
              private seoService: SeoService,
              private postService: PostService,
              private auth: AuthService,
              private editorService: EditorService,
              private followerService: FollowerService,
              private bookmarkService: BookmarkService,
              private toastr: ToastrService) {

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
        // window.scrollTo(0, 0);
      }
    });
  }

  async initialiseInvites() {
    // Set default values and re-fetch any data you need.
    if (this.route.paramMap) {
      this.route.paramMap.subscribe(params => this.postId = params.get('id'));
      if (this.postId) {
        this.post$ = this.postService.getPost(this.postId);
        this.post$.subscribe(post => {
          if (post) {
            this.category_class = post.category === 'tecnologia' || post.category === 'emprendimiento' ||
            post.category === 'productividad' || post.category === 'liderazgo' ? post.category : 'otro';
            this.showSpinner = false;
            this.userId = post.user.uid;
            this.seoService.generateTags({
              title: post.title,
              description: post.description,
              image: post.image,
              slug: 'post/' + this.postId
            });
          }
        });
        this.post = await this.postService.getPostUnique(this.postId);
        this.editor = await this.editorService.getEditorUnique(this.post.user.uid);
        this.postService.setVisit(this.postId, this.post.visitCount);
        this.editorService.setVisit(this.post.user.uid, this.editor.visitCount);
        this.identifier = '/' + this.postId;
        if (this.auth.user$) {
          this.auth.user$.subscribe((auth) => {
            if (auth) {
              this.getFollow(this.userId);
              this.getBookmark(auth.uid, this.postId);
            }
          });
        }
      }
    }
  }

  async ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    this.initialiseInvites();
  }

  async follow(followedId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.followerService.setFollow(user.uid, followedId).then(() => {
        this.editorService.setFollowerCount(this.editor.uid, this.editor.followerCount, true)
          .then(() => this.toastr.success('Agregado!', 'Piensa digital'));
      });
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

  async unFollow(followedId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.followerService.setUnfollow(user.uid, followedId).then(() => {
        this.editorService.setFollowerCount(this.editor.uid, this.editor.followerCount, false)
          .then(() => this.toastr.success('Eliminado!', 'Piensa digital'));
      });
    } else {
      this.toastr.error('Error!', 'Piensa digital');
    }
  }

  async getFollow(followedId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.followerService.getFollowRT(user.uid, followedId).subscribe(editor => {
        if (editor) {
          this.followed = editor;
        } else {
          this.followed = null;
        }
      });
    } else {
      this.followed = null;
    }
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
    this.bookmarkService.getBookmark(userId, postId).subscribe(bookmark => this.bookmark = bookmark);
  }

  copyURL() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toastr.success('URL copiada al portapapeles!', 'Piensa digital');
  }

}
