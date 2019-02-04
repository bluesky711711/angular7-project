import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';



// Guards
import { CoreModule } from './core/core.module';
import { AdminGuard } from './core/admin.guard';
import { EditorGuard } from './core/editor.guard';
import { CanReadGuard } from './core/can-read.guard';
import { AdminEditorGuard } from './core/admin-editor.guard';
import { SubscriberGuard } from './core/subscriber.guard';

// Layouts
import { LayoutModule } from './layouts/layout.module';

// Pipes

// Components
import { AppComponent } from './app.component';
import { PostEditorComponent } from './pages/post-editor/post-editor.component';
import { PostComponent } from './pages/post/post.component';
import { ErrorComponent } from './pages/error/error.component';
import { CategoryDialogComponent } from './layouts/category-dialog/category-dialog.component';
import { TagDialogComponent } from './layouts/tag-dialog/tag-dialog.component';
import { SearchComponent } from './pages/search/search.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContributorsComponent } from './pages/contributors/contributors.component';
import { CategoryComponent } from './pages/category/category.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { SubcategoryDialogComponent } from './layouts/subcategory-dialog/subcategory-dialog.component';
import { BecomeComponent } from './pages/become/become.component';

// Utils
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MomentModule } from 'ngx-moment';
import { DisqusModule } from 'ngx-disqus';
import { NgProgressModule } from '@ngx-progressbar/core';
import { ToastrModule } from 'ngx-toastr';


// Services
import { EditorService } from './services/editor.service';
import { AnimationsService } from './core/animations/animations.service';

// Directives
import { ScrollableDirective } from './directives/scrollable.directive';

// import social buttons module
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';


const guards = [
  CanReadGuard,
  AdminGuard,
  AdminEditorGuard,
  EditorGuard,
  SubscriberGuard
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    PostEditorComponent,
    PostComponent,
    ScrollableDirective,
    SearchComponent,
    AboutUsComponent,
    ContributorsComponent,
    CategoryComponent,
    TopicsComponent,
    BecomeComponent
  ],
  imports:[
 CommonModule,
NgtUniversalModule,
 
 TransferHttpCacheModule,
HttpClientModule,
 
    
    LayoutModule,
    AppRoutingModule,
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
    DisqusModule.forRoot('piensadigital'),
    NgProgressModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1300,
      closeButton: true,
      preventDuplicates: true
    }),
	// add social buttons module to NgModule imports
    JwSocialButtonsModule
  ],
  entryComponents: [
    CategoryDialogComponent,
    SubcategoryDialogComponent,
    TagDialogComponent
  ],
  providers: [...guards, EditorService, AnimationsService],
})
export class AppModule { }
