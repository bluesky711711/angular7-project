import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedHomeComponent } from './recommended-home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { ToStringPipe } from '../../pipes/to-string.pipe';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('RecommendedHomeComponent', () => {
  let component: RecommendedHomeComponent;
  let fixture: ComponentFixture<RecommendedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MomentModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot()],
      declarations: [RecommendedHomeComponent, ToStringPipe, ToReadTimePipe, ToDatePipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
