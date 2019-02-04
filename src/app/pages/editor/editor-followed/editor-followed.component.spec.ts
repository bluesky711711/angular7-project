import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFollowedComponent } from './editor-followed.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../../environments/environment';
import { MaterialModule } from '../../../material.module';
import { AngularFireModule } from '@angular/fire';
import { ToUserPipe } from '../../../pipes/to-user.pipe';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ToPositionPipe } from '../../../pipes/to-position.pipe';
import { AuthService } from '../../../core/auth.service';

describe('EditorFollowedComponent', () => {
  let component: EditorFollowedComponent;
  let fixture: ComponentFixture<EditorFollowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [EditorFollowedComponent, ToUserPipe, ToPositionPipe],
      providers: [{ provide: ActivatedRoute, useValue: { } }, AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
