import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemPostComponent } from './item-post.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'ngx-moment';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';

describe('ItemPostComponent', () => {
  let component: ItemPostComponent;
  let fixture: ComponentFixture<ItemPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        RouterTestingModule
      ],
      declarations: [ItemPostComponent, ToDatePipe, ToStringPipe, ToReadTimePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
