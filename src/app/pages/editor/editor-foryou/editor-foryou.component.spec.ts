import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorForyouComponent } from './editor-foryou.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ToCategoryPipe } from 'src/app/pipes/to-category.pipe';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';

describe('EditorForyouComponent', () => {
  let component: EditorForyouComponent;
  let fixture: ComponentFixture<EditorForyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterTestingModule,
        AngularFireStorageModule,
        ToastrModule.forRoot()
      ],
      declarations: [EditorForyouComponent, ToCategoryPipe],
      providers: [AuthService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorForyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
