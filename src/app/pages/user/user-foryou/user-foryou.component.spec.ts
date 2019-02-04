import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForyouComponent } from './user-foryou.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { MomentModule } from 'ngx-moment';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ToDatePipe } from '../../../pipes/to-date.pipe';

describe('UserForyouComponent', () => {
  let component: UserForyouComponent;
  let fixture: ComponentFixture<UserForyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        MomentModule,
        ToastrModule.forRoot()
      ],
      declarations: [UserForyouComponent, ToReadTimePipe, ToStringPipe, ToDatePipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
