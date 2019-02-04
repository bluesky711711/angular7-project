import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  term;
  results$: Observable<any[]>;
  offset = new Subject<string>();
  param;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.paramMap)  {
      // this.route.queryParams.subscribe(params =>  this.param = params.get('term'));
      this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.param = params);
      if (this.param.category) {
        this.term = this.param.category;
        this.results$ = this.searchService.searchCategory(this.term);
      } else if (this.param.tag) {
        this.term = this.param.tag;
        this.results$ = this.searchService.searchTag(this.term);
      } else {
        this.results$ = this.search();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByIdx(i) {
    return i;
  }

  onkeyup(e) {
    if (e.length >= 3) {
      this.offset.next(e.toLowerCase());
    } else {
      this.results$ = this.search();
    }
  }

  search() {
    return this.searchService.search(this.offset);
  }
}
