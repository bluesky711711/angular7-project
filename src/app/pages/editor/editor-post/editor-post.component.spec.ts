import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorPostComponent } from './editor-post.component';
import { AuthService } from '../../../core/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToUserPipe } from '../../../pipes/to-user.pipe';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { environment } from '../../../../environments/environment';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../../material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ToDatePipe } from '../../../pipes/to-date.pipe';

describe('EditorPostComponent', () => {
  let component: EditorPostComponent;
  let fixture: ComponentFixture<EditorPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [EditorPostComponent, ToUserPipe, ToReadTimePipe, ToStringPipe, ToDatePipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
