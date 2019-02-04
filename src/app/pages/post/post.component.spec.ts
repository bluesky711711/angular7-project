import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { AuthService } from '../../core/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { ToPositionPipe } from '../../pipes/to-position.pipe';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { SafeHtmlPipe } from '../../pipes/to-safe-html.pipe';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [PostComponent, ToPositionPipe, ToReadTimePipe, ToStringPipe, SafeHtmlPipe, ToDatePipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
