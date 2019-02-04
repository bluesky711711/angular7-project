import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { EditorService } from '../../services/editor.service';
import { FollowerService } from '../../services/follower.service';
import { Observable } from 'rxjs';
import { Editor } from '../../models/editor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editors-home',
  templateUrl: './editors-home.component.html',
  styleUrls: ['./editors-home.component.css']
})
export class EditorsHomeComponent implements OnInit {

  editors$: Observable<Editor[]>;
  editor = [];
  class = [];
  followed = [];

  constructor(private auth: AuthService,
              private editorService: EditorService,
              private followerService: FollowerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.editors$ = this.editorService.getEditorsHome();
    this.editors$.subscribe(editors => {
      editors.map((editor, i) => {
        this.editor[i] = editor;
        this.getFollow(editor.uid, i);
      });
    });
  }

  async follow(followedId, i) {
      const user = await this.auth.isLoggedIn();
      if (user) {
        this.followerService.setFollow(user.uid, followedId).then(() => {
          this.editorService.setFollowerCount(this.editor[i].uid, this.editor[i].followerCount, true);
        }).then(() => this.toastr.success('Agregado!', 'Piensa digital'));
      } else {
        this.toastr.success('Logeate para continuar!', 'Piensa digital');
      }
  }

  async unFollow(followedId, i) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.followerService.setUnfollow(user.uid, followedId).then(() => {
        this.editorService.setFollowerCount(this.editor[i].uid, this.editor[i].followerCount, false);
      });
    } else {
      this.toastr.error('Error', 'Piensa digital');
    }
  }

  async getFollow(followedId, i) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      const editor = await this.followerService.getFollow(user.uid, followedId);
      if (editor) {
        this.followed[i] = editor.followedId;
      } else {
        this.followed[i] = null;
      }
    } else {
      this.followed[i] = null;
    }
  }
}
