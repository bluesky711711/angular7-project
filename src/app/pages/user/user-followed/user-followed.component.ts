import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { EditorService } from '../../../services/editor.service';
import { FollowerService } from '../../../services/follower.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-followed',
  templateUrl: './user-followed.component.html',
  styleUrls: ['./user-followed.component.css']
})
export class UserFollowedComponent implements OnInit {

  userId = null;
  editors: any = [];
  followed = [];
  editorId = [];
  editor = [];

  constructor(private auth: AuthService,
    public route: ActivatedRoute,
    public page: PaginationService,
    private editorService: EditorService,
    private followerService: FollowerService,
    private toastr: ToastrService) { }


  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => this.userId = params.id);
      this.pageInit(this.userId);
      this.page.data.subscribe(followeds => followeds.map((followed, i) => {
        this.editors[i] = this.editorService.getEditor(followed.followedId);
        this.editors[i].subscribe(editor => this.editor[i] = editor);
        this.editorId[i] = followed.followedId;
        this.getFollow(followed.followedId, i);
      }));
    }
  }

  pageInit(userId) {
    if (userId) {
      this.page.reset();
      this.page.init('relationships', 'createdAt', 'followerId', userId, { reverse: true, prepend: false });
    }
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

  async unFollow(followedId, i) {
    const user = await this.auth.isLoggedIn();
    if (user) {
      this.followerService.setUnfollow(user.uid, followedId).then(() => {
        if (this.editor[i]) {
          this.editorService.setFollowerCount(this.editor[i].uid, this.editor[i].followerCount, false)
            .then(() => this.pageInit(this.userId))
            .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
        }
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
