import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBookmarksComponent } from './editor-bookmarks.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToPositionPipe } from 'src/app/pipes/to-position.pipe';
import { ToUserPipe } from 'src/app/pipes/to-user.pipe';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';

describe('EditorBookmarksComponent', () => {
  let component: EditorBookmarksComponent;
  let fixture: ComponentFixture<EditorBookmarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        AngularFireStorageModule,
        ToastrModule.forRoot()
      ],
      declarations: [EditorBookmarksComponent, ToPositionPipe, ToUserPipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
