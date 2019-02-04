import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-last',
  templateUrl: './home-last.component.html',
  styleUrls: ['./home-last.component.css']
})
export class HomeLastComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();


  constructor(@Inject(WINDOW) private window: Window, public page: PaginationService,
              private router: Router) {
      this.subscribeToRouterEvents();
    }

  ngOnInit() {
    this.initialiseInvites();
  }

  ngOnDestroy() {
    this.page.reset();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
        // window.scrollTo(0, 1820);
      }
    });
  }

  initialiseInvites() {
    // this.page.reset();
    this.page.init('posts', 'createdAt', '', '', { reverse: true, prepend: false }, 'aprobado');
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
