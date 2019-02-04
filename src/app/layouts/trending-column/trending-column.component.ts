import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-trending-column',
  templateUrl: './trending-column.component.html',
  styleUrls: ['./trending-column.component.css']
})
export class TrendingColumnComponent implements OnInit {

  posts$: Observable<Post[]>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.trending(5);
  }

}
