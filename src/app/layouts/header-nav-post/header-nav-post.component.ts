import { WINDOW } from '@ng-toolkit/universal';
import { Component, AfterViewInit, HostBinding, HostListener, Input, Inject, PLATFORM_ID } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-header-nav-post',
  templateUrl: './header-nav-post.component.html',
  styleUrls: ['./header-nav-post.component.css'],
  animations: [
    trigger('toggle', [
      transition('* => *', animate('200ms ease-in')),
      state(
        'active',
        style({ opacity: 0, transform: 'translateY(-10%)', zIndex: '-1' })
      ),
      state(
        'inactive',
        style({ opacity: 1, transform: 'translateY(0)' })
      )
    ])
  ]
})
export class HeaderNavPostComponent implements AfterViewInit {
  @Input() post;
  @Input() editor;
  isVisible: any = true;
  user = null;
  modal: any;
  width = '0%';
  height;
  height_footer = 450;

  constructor(@Inject(WINDOW) private window: Window, @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (window.screen.availWidth >= 1500) {
        this.height = 600;
      } else if (window.screen.availWidth < 1500 && window.screen.availWidth >= 1000) {
        this.height = 500;
      } else if (window.screen.availWidth < 1000 && window.screen.availWidth >= 500) {
        this.height = 350;
      } else {
        this.height = 250;
        this.height_footer = 1400;
      }
    }
  }


  @HostBinding('@toggle')
  get toggle() {
    return this.isVisible ? 'active' : 'inactive';
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const scroll$ = fromEvent(this.window, 'scroll').pipe(
        throttleTime(10),
        map(() => this.window.pageYOffset),
        pairwise(),
        map(([y1, y2]): Direction => {
          if (y2 > this.height ) {
            return (y2 < y1 ? Direction.Up : Direction.Down);
          }
        }),
        distinctUntilChanged(),
        share()
      );

      const goingUp$ = scroll$.pipe(
        filter(direction => direction === Direction.Up)
      );

      const goingDown$ = scroll$.pipe(
        filter(direction => direction === Direction.Down)
      );

      goingUp$.subscribe(() => (this.isVisible = true));
      goingDown$.subscribe(() => (this.isVisible = false));
    }
  }

  @HostListener('window: scroll', ['$event'])
  onScroll($event) {
    try {
      const top = $event.target.scrollingElement.scrollTop;
      const height = $event.target.scrollingElement.scrollHeight;
      const top_post = top - this.height;
      const height_post = height - 2100 ;
      const scrolled = ((top_post / height_post) * 100);
      this.width = scrolled + '%';
      // console.log(top);
      if (top < this.height) {
        this.isVisible = true;
      }

      if (top + this.window.innerHeight >= height - this.height_footer) {
        this.isVisible = true;
      }
    } catch (err) { }
  }

}
