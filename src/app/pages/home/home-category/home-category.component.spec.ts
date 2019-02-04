import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategoryComponent } from './home-category.component';
import { ToCategoryPipe } from '../../../pipes/to-category.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { ToReadTimePipe } from '../../../pipes/to-read-time.pipe';
import { ToStringPipe } from '../../../pipes/to-string.pipe';
import { AuthService } from '../../../core/auth.service';
import { MaterialModule } from '../../../material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ToDatePipe } from '../../../pipes/to-date.pipe';

describe('HomeCategoryComponent', () => {
  let component: HomeCategoryComponent;
  let fixture: ComponentFixture<HomeCategoryComponent>;

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
      declarations: [ HomeCategoryComponent, ToCategoryPipe, ToReadTimePipe, ToStringPipe, ToDatePipe ],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
