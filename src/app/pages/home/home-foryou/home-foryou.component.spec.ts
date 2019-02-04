import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeForyouComponent } from './home-foryou.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { AuthService } from '../../../core/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ToDatePipe } from '../../../pipes/to-date.pipe';

describe('HomeForyouComponent', () => {
  let component: HomeForyouComponent;
  let fixture: ComponentFixture<HomeForyouComponent>;

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
      declarations: [HomeForyouComponent, ToStringPipe, ToReadTimePipe, ToDatePipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
