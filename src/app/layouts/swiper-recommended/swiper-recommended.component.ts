import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PostService } from '../../services/post.service';
import { Observable, Subject } from 'rxjs';
import { Post } from '../../models/post';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-swiper-recommended',
  templateUrl: './swiper-recommended.component.html',
  styleUrls: ['./swiper-recommended.component.css']
})
export class SwiperRecommendedComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  posts$: Observable<Post[]>;

  public config: SwiperConfigInterface = {
    slidesPerView: 1.5,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  constructor(private postService: PostService) { }
  category_class = [];

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
