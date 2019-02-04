import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropEditorComponent } from './image-crop-editor.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

describe('ImageCropEditorComponent', () => {
  let component: ImageCropEditorComponent;
  let fixture: ComponentFixture<ImageCropEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        ToastrModule.forRoot()
      ],
      declarations: [ImageCropEditorComponent],
      providers: [AngularFireStorage],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCropEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
