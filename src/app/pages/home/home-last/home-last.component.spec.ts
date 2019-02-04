import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLastComponent } from './home-last.component';
import { AuthService } from '../../../core/auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToCategoryPipe } from '../../../pipes/to-category.pipe';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { environment } from '../../../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from 'ngx-moment';
import { ToDatePipe } from '../../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('HomeLastComponent', () => {
  let component: HomeLastComponent;
  let fixture: ComponentFixture<HomeLastComponent>;

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
      declarations: [HomeLastComponent, ToCategoryPipe, ToReadTimePipe, ToStringPipe, ToDatePipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
