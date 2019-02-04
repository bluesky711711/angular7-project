import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LayoutModule } from './layouts/layout.module';
import { NgProgressModule } from '@ngx-progressbar/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './core/auth.service';
import { UserService } from './services/user.service';
import { EditorService } from './services/editor.service';
import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { AgeService } from './services/age.service';
import { OccupationService } from './services/occupation.service';
import { PositionService } from './services/position.service';
import { PaginationService } from './services/pagination.service';
import { FollowerService } from './services/follower.service';
import { BookmarkService } from './services/bookmark.service';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MomentModule } from 'ngx-moment';
import { ScrollingModule } from '@angular/cdk-experimental';
import { DisqusModule } from 'ngx-disqus';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

const services = [
  AuthService,
  UserService,
  EditorService,
  PostService,
  CategoryService,
  TagService,
  AgeService,
  OccupationService,
  PositionService,
  PaginationService,
  FollowerService,
  BookmarkService,
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        LayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        CoreModule,
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        MomentModule,
        ScrollingModule,
        DisqusModule.forRoot('piensadigital'),
        NgProgressModule.forRoot(),
        ToastrModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [...services],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'piensadigital'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('piensadigital');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to piensadigital!');
  // }));
});
