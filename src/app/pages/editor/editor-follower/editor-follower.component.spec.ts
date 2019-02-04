import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFollowerComponent } from './editor-follower.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToUserPipe } from '../../../pipes/to-user.pipe';
import { environment } from '../../../../environments/environment';
import { MaterialModule } from '../../../material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { ToPositionPipe } from '../../../pipes/to-position.pipe';
import { AuthService } from '../../../core/auth.service';

describe('EditorFollowerComponent', () => {
  let component: EditorFollowerComponent;
  let fixture: ComponentFixture<EditorFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule
      ],
      declarations: [EditorFollowerComponent, ToUserPipe, ToPositionPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
