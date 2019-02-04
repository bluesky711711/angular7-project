import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperRecommendedComponent } from './swiper-recommended.component';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';

describe('SwiperRecommendedComponent', () => {
  let component: SwiperRecommendedComponent;
  let fixture: ComponentFixture<SwiperRecommendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot()],
      declarations: [SwiperRecommendedComponent, ToStringPipe, ToReadTimePipe, ToDatePipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
