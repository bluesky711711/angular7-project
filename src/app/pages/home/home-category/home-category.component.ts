import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, OnDestroy, Inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.css']
})
export class HomeCategoryComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  param;

  constructor(@Inject(WINDOW) private window: Window, @Inject(PLATFORM_ID) private platformId: any,
              private route: ActivatedRoute,
              public page: PaginationService,
              private router: Router) {
              this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => this.param = params.get('name'));
              this.subscribeToRouterEvents();
  }

  ngOnInit() {
    this.initialiseInvites();
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
        if (isPlatformBrowser(this.platformId)) {
          this.window.scrollTo(0, 1840);
        }
      } else {
        return false;
      }
    });
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    if (this.param) {
      // this.page.reset();
      this.page.init('posts', 'createdAt', 'category', this.param, { reverse: true, prepend: false }, 'aprobado');
    }
  }

  ngOnDestroy() {
    this.page.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackByIdx(i) {
    return i;
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.page.more();
    }
  }

}
