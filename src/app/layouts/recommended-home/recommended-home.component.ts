import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observable, Subject } from 'rxjs';
import { Post } from '../../models/post';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recommended-home',
  templateUrl: './recommended-home.component.html',
  styleUrls: ['./recommended-home.component.css']
})
export class RecommendedHomeComponent implements OnInit, OnDestroy {
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
