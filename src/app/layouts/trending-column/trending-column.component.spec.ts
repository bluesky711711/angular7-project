import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingColumnComponent } from './trending-column.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToReadTimePipe } from '../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../pipes/to-string.pipe';

describe('TrendingColumnComponent', () => {
  let component: TrendingColumnComponent;
  let fixture: ComponentFixture<TrendingColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot()
      ],
      declarations: [ TrendingColumnComponent, ToDatePipe, ToReadTimePipe, ToStringPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
