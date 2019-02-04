import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TopicService } from '../../services/topic.service';
import { Category } from '../../models/category';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  topics$: Observable<any[]>;
  userId = null;
  followed = [];

  constructor(private auth: AuthService, private topicService: TopicService, private toastr: ToastrService) { }

  async ngOnInit() {
    const user = await this.auth.getUserId();
    if (user) {
      this.userId = user.uid;
      this.topics$ = this.topicService.topics;
      this.topics$.pipe(takeUntil(this.unsubscribe$)).subscribe(topics => topics.map((topic, i) => {
        this.followed[i] = topic;
        if (topic.subcategories) {
          topic.subcategories.map((subcategory, k) => {
            this.getFollow(subcategory.uid, i, k);
          });
        }
      }));
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  follow(topicId) {
    this.topicService.setFollow(this.userId, topicId)
      .then()
      .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
  }

  unFollow(topicId) {
    this.topicService.setUnfollow(this.userId, topicId)
      .then()
      .catch(e => this.toastr.error('Error:' + e, 'Piensa digital'));
  }

  getFollow(topicId, i, k) {
    this.topicService.getFollowRT(this.userId, topicId).pipe(takeUntil(this.unsubscribe$)).subscribe((topic) => {
      if (topic) {
        this.followed[i].subcategories[k].uid = topic.topicId;
      } else {
        this.followed[i].subcategories[k].uid = '';
      }
    });
  }
}

