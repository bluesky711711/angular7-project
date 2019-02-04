import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recommended-post',
  templateUrl: './recommended-post.component.html',
  styleUrls: ['./recommended-post.component.css']
})
export class RecommendedPostComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  posts$: Observable<Post[]>;
  category_class = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.recomendedPosts();
    this.posts$.pipe(takeUntil(this.unsubscribe$)).subscribe(posts => posts.map((post, i) =>
      this.category_class[i] = post.category === 'tecnologia' || post.category === 'emprendimiento' ||
        post.category === 'productividad' || post.category === 'liderazgo' ? post.category : 'otro'));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
