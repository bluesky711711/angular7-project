import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-more-read-home',
  templateUrl: './more-read-home.component.html',
  styleUrls: ['./more-read-home.component.css']
})
export class MoreReadHomeComponent implements OnInit {
  posts$: Observable<Post[]>;
  class = [];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.moreReads(3);
    this.posts$.subscribe(posts => posts.map((post, i) => {
      this.class[i] = post.category === 'tecnologia' || post.category === 'emprendimiento' ||
      post.category === 'productividad' || post.category === 'liderazgo' ? post.category : 'otro';
      }));
  }

}
