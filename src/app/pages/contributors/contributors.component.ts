import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { EditorService } from '../../services/editor.service';
import { Editor } from '../../models/editor';
import { Observable } from 'rxjs';
import { FollowerService } from '../../services/follower.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrls: ['./contributors.component.css']
})
export class ContributorsComponent implements OnInit {
  editors$: Observable<Editor[]>;
  editor = [];
  userId = null;
  class = [];
  followed = [];

  constructor(private auth: AuthService,
              private editorService: EditorService,
              private followerService: FollowerService,
              private toastr: ToastrService) { }

  async ngOnInit() {
    const user = await this.auth.isLoggedIn();
    this.editors$ = this.editorService.getEditors();
    if (user) {
      this.userId = user.uid;
      this.editors$.subscribe(editors => editors.map((editor, i) => {
        this.editor[i] = editor;
        this.getFollow(editor.uid, i);
      }));
    }
  }

  follow(followedId, i) {
    if (this.userId) {
      this.followerService.setFollow(this.userId, followedId).then(() => {
        this.editorService.setFollowerCount(this.editor[i].uid, this.editor[i].followerCount, true);
      }).then(() => this.toastr.success('Agregado!', 'Piensa digital'));
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

   unFollow(followedId, i) {
    if (this.userId) {
      this.followerService.setUnfollow(this.userId, followedId).then(() => {
        this.editorService.setFollowerCount(this.editor[i].uid, this.editor[i].followerCount, false);
      });
    } else {
      this.toastr.success('Logeate para continuar!', 'Piensa digital');
    }
  }

  getFollow(followedId, i) {
    if (this.userId) {
      this.followerService.getFollowRT(this.userId, followedId).subscribe(editor => {
        if (editor) {
          this.followed[i] = editor.followedId;
        } else {
          this.followed[i] = null;
        }
      });
    } else {
      this.followed[i] = null;
    }
  }

}
