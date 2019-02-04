import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableUsersComponent } from './datatable-users.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from '../../material.module';
import { MomentModule } from 'ngx-moment';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('DatatableUsersComponent', () => {
  let component: DatatableUsersComponent;
  let fixture: ComponentFixture<DatatableUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ DatatableUsersComponent ],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
