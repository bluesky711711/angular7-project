import { WINDOW } from '@ng-toolkit/universal';
import { Directive, HostListener, EventEmitter, Output, ElementRef , Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {

  @Output() scrollPosition = new EventEmitter();


  constructor(@Inject(WINDOW) private window: Window, public el: ElementRef) { }

  @HostListener('window: scroll', ['$event'])
  onScroll(event) {
    try {
      const top = event.target.scrollingElement.scrollTop;
      // const height = this.el.nativeElement.scrollHeight;
      const height = event.target.scrollingElement.scrollHeight;

      if (top + this.window.innerHeight >= height - 180) {
        this.scrollPosition.emit('bottom');
      }

      if (top === 0) {
        this.scrollPosition.emit('top');
      }

    } catch (err) { }
  }

}
