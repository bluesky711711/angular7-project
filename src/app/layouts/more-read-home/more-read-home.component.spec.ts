import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreReadHomeComponent } from './more-read-home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';

describe('MoreReadHomeComponent', () => {
  let component: MoreReadHomeComponent;
  let fixture: ComponentFixture<MoreReadHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        ToastrModule.forRoot()
      ],
      declarations: [MoreReadHomeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreReadHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
