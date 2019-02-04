import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Output() category = new EventEmitter();
  @Input() categoryExt: string;
  categories: Observable<any[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = this.categoryService.categories;
  }

  ngChange(event) {
    this.category.emit(event);
  }
}
