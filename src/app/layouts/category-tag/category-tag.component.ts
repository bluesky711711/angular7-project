import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.css']
})
export class CategoryTagComponent implements OnInit {
  @Input() post: Post;
  category_class;

  constructor() {
  }

  ngOnInit() {
    if (this.post) {
      this.category_class = this.post.category === 'tecnologia' || this.post.category === 'emprendimiento' ||
        this.post.category === 'productividad' || this.post.category === 'liderazgo' ? this.post.category : 'otro';
    }
  }

}
