import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorMypostComponent } from './editor-mypost.component';
import { ToUserPipe } from '../../../pipes/to-user.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../environments/environment';
import { MomentModule } from 'ngx-moment';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { AuthService } from '../../../core/auth.service';
import { ToDatePipe } from '../../../pipes/to-date.pipe';

describe('EditorMypostComponent', () => {
  let component: EditorMypostComponent;
  let fixture: ComponentFixture<EditorMypostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule
      ],
      declarations: [EditorMypostComponent, ToUserPipe, ToReadTimePipe, ToStringPipe, ToDatePipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorMypostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
