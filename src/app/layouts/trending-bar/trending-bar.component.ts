import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';

@Component({
  selector: 'app-trending-bar',
  templateUrl: './trending-bar.component.html',
  styleUrls: ['./trending-bar.component.css']
})
export class TrendingBarComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.trending(5);
  }


}
