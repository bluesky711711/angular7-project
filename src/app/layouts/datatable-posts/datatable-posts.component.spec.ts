import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablePostsComponent } from './datatable-posts.component';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToUserPipe } from '../../pipes/to-user.pipe';
import { ToDatePipe } from '../../pipes/to-date.pipe';
import { ToastrModule } from 'ngx-toastr';

describe('DatatablePostsComponent', () => {
  let component: DatatablePostsComponent;
  let fixture: ComponentFixture<DatatablePostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ],
      declarations: [DatatablePostsComponent, ToUserPipe, ToDatePipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablePostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
