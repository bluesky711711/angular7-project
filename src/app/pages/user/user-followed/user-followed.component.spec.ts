import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowedComponent } from './user-followed.component';
import { MaterialModule } from 'src/app/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ToUserPipe } from 'src/app/pipes/to-user.pipe';
import { ToPositionPipe } from 'src/app/pipes/to-position.pipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserFollowedComponent', () => {
  let component: UserFollowedComponent;
  let fixture: ComponentFixture<UserFollowedComponent>;

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
      declarations: [UserFollowedComponent, ToUserPipe, ToPositionPipe ],
      providers: [{ provide: ActivatedRoute, useValue: {} }, AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
