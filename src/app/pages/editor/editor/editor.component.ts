import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, OnDestroy, ViewChild , Inject} from '@angular/core';
import { EditorService } from '../../../services/editor.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../core/auth.service';
import { FollowerService } from '../../../services/follower.service';
import { Observable, Subject } from 'rxjs';
import { Editor } from '../../../models/editor';
import { ToastrService } from 'ngx-toastr';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { first, takeUntil } from 'rxjs/operators';
import { routeAnimations } from '../../../core/animations/route.animations';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  animations: [routeAnimations]
})
export class EditorComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  editor$: Observable<Editor>;
  editor;
  userId = null;
  userLogged = null;
  followed = null;

  progress: NgProgressRef;

  constructor(@Inject(WINDOW) private window: Window, private auth: AuthService,
              private titleService: Title,
              private route: ActivatedRoute,
              private router: Router,
              private editorService: EditorService,
              private followerService: FollowerService,
              private toastr: ToastrService,
              public progressRef: NgProgress) {
    this.titleService.setTitle('Editor - Piensa Digital');
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.userId = params.get('id'));
    this.subscribeToRouterEvents();
  }

  async ngOnInit() {
    this.initialiseInvites();
    this.progress = this.progressRef.ref();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
        this.window.scrollTo(0, 0);
      }
    });
  }

  async initialiseInvites() {
    this.editor$ = this.editorService.getEditor(this.userId);
    this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(auth => {
      if (auth) {
        this.userLogged = auth.uid;
        this.getFollow(this.userId);
      }
    });
    this.editor = await this.editor$.pipe(first()).toPromise();

  }

  async follow(followedId) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.followerService.setFollow(user.uid, followedId).then(() => {
        this.editorService.setFollowerCount(this.editor.uid, this.editor.followerCount, true);
      }).then(() => this.toastr.success('Agregado!', 'Piensa digital'));
    } else {
      this.toastr.error('Logeate para continuar!', 'Piensa digital');
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
      this.followerService.getFollowRT(user.uid, followedId).pipe(takeUntil(this.unsubscribe$)).subscribe(editor => {
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

}
