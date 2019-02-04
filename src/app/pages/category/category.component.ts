import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PaginationService } from '../../services/pagination.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  param;

  constructor(private route: ActivatedRoute,
    public page: PaginationService,
    private router: Router) {
    this.subscribeToRouterEvents();
  }

  ngOnInit() {
    this.initialiseInvites();
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    if (this.param) {
      this.page.reset();
      this.page.init('posts', 'createdAt', 'subcategory', this.param, { reverse: true, prepend: false }, 'aprobado');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToRouterEvents() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.param = params.get('id'));
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      } else {
        return false;
      }
    });
  }

  trackByIdx(i) {
    return i;
  }

  scrollHandler() {
    // if (e === 'bottom') {
      this.page.more();
    // }
  }

}
