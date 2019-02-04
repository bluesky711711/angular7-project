import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorsHomeComponent } from './editors-home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToNumberPipe } from '../../pipes/to-number.pipe';
import { AuthService } from '../../core/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('EditorsHomeComponent', () => {
  let component: EditorsHomeComponent;
  let fixture: ComponentFixture<EditorsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [EditorsHomeComponent, ToNumberPipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
