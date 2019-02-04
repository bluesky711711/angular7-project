import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHomeComponent } from './slider-home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('SliderHomeComponent', () => {
  let component: SliderHomeComponent;
  let fixture: ComponentFixture<SliderHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        RouterTestingModule,
        ToastrModule.forRoot()],
      declarations: [SliderHomeComponent, ToReadTimePipe, ToStringPipe, ToDatePipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
