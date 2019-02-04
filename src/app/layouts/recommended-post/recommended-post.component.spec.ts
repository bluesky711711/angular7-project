import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedPostComponent } from './recommended-post.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('RecommendedPostComponent', () => {
  let component: RecommendedPostComponent;
  let fixture: ComponentFixture<RecommendedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot()],
      declarations: [RecommendedPostComponent, ToReadTimePipe, ToStringPipe, ToDatePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
