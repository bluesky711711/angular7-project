import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import AOS from 'aos';
import { Router, NavigationStart } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { routeAnimation } from './animations';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  menu_mobile = false;
  display_router = 'block';

  constructor(@Inject(PLATFORM_ID) private platformId: any, private router: Router) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.display_router = 'block';
        this.menu_mobile = false;
      }
    });
  }

  showMenu($event) {
    this.display_router = 'none';
    this.menu_mobile = $event;
  }

  hideMenu($event) {
    this.display_router = 'block';
    this.menu_mobile = $event;
  }
}
