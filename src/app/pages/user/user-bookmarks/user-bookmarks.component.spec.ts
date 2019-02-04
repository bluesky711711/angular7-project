import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookmarksComponent } from './user-bookmarks.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToPostPipe } from '../../../pipes/to-post.pipe';
import { ToUserPipe } from '../../../pipes/to-user.pipe';
import { MomentModule } from 'ngx-moment';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { ToPostImagePipe } from '../../../pipes/to-post-image.pipe';
import { AuthService } from '../../../core/auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToDatePipe } from '../../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('UserBookmarksComponent', () => {
  let component: UserBookmarksComponent;
  let fixture: ComponentFixture<UserBookmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        AngularFireStorageModule,
        ToastrModule.forRoot()
      ],
      declarations: [ UserBookmarksComponent, ToPostPipe, ToUserPipe, ToReadTimePipe, ToStringPipe, ToPostImagePipe, ToDatePipe ],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
