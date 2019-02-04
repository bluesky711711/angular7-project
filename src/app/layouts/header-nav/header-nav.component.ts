import { WINDOW } from '@ng-toolkit/universal';
import { AfterViewInit, Component, HostBinding, HostListener, Output, EventEmitter, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
import { isPlatformBrowser } from '@angular/common';

enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

enum Direction {
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
  animations: [
    trigger('toggle', [
      transition('* => *', animate('200ms ease-in')),
      state(
        'inactive',
        style({ opacity: 0, transform: 'translateY(-10%)', zIndex: '-1' })
      ),
      state(
        'active',
        style({ opacity: 1, transform: 'translateY(0)' })
      )
    ])
  ]
})
export class HeaderNavComponent implements AfterViewInit {
  isVisible: any = true;
  user = null;
  modal: any;
  @Output() show_menu = new EventEmitter();

  constructor(@Inject(WINDOW) private window: Window, @Inject(PLATFORM_ID) private platformId: any,
              public auth: AuthService,
              private modalService: NgbModal) {

  }

  openModal(content) {
    this.modal = this.modalService.open(content);
  }

  closeModal() {
    this.modal.close();
  }

  googleLogin() {
    this.auth.googleLogin().then(() => this.closeModal());
  }

  facebookLogin() {
    this.auth.facebookLogin().then(() => this.closeModal());
  }

  twitterLogin() {
    this.auth.twitterLogin().then(() => this.closeModal());
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
        map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
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
      if (top === 0) {
        this.isVisible = true;
      }
    } catch (err) { }
  }

  showMenu() {
    this.show_menu.emit(true);
  }
}
