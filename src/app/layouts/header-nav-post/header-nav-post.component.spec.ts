import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavPostComponent } from './header-nav-post.component';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderNavPostComponent', () => {
  let component: HeaderNavPostComponent;
  let fixture: ComponentFixture<HeaderNavPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [ HeaderNavPostComponent, ToReadTimePipe, ToStringPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNavPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
