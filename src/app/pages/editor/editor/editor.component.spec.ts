import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponent } from './editor.component';
import { ToPositionPipe } from '../../../pipes/to-position.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToUserPipe } from '../../../pipes/to-user.pipe';
import { AuthService } from '../../../core/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from 'ngx-moment';
import { ToNumberPipe } from '../../../pipes/to-number.pipe';
import { ToCategoryPipe } from '../../../pipes/to-category.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

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
      declarations: [EditorComponent, ToUserPipe, ToReadTimePipe, ToStringPipe, ToPositionPipe, ToNumberPipe, ToCategoryPipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
