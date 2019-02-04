import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor/editor.component';
import { EditorPostComponent } from './editor-post/editor-post.component';
import { EditorBookmarksComponent } from '../editor/editor-bookmarks/editor-bookmarks.component';
import { EditorFollowerComponent } from './editor-follower/editor-follower.component';
import { EditorFollowedComponent } from './editor-followed/editor-followed.component';
import { EditorMypostComponent } from './editor-mypost/editor-mypost.component';
import { EditorConfigComponent } from './editor-config/editor-config.component';
import { EditorForyouComponent } from './editor-foryou/editor-foryou.component';

import { EditorGuard } from '../../core/editor.guard';
import { LayoutModule } from '../../layouts/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../material.module';

export const EditorRoutes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      { path: 'posts', component: EditorPostComponent },
      { path: 'foryou', component: EditorForyouComponent, canActivate: [EditorGuard] },
      { path: 'bookmarks', component: EditorBookmarksComponent, canActivate: [EditorGuard] },
      { path: 'follower', component: EditorFollowerComponent, canActivate: [EditorGuard] },
      { path: 'followed', component: EditorFollowedComponent, canActivate: [EditorGuard] },
      { path: 'myposts', component: EditorMypostComponent, canActivate: [EditorGuard] },
      { path: 'config', component: EditorConfigComponent, canActivate: [EditorGuard] },
    ],
    canActivate: [EditorGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EditorRoutes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    MaterialModule
  ],
  declarations: [
    EditorComponent,
    EditorPostComponent,
    EditorBookmarksComponent,
    EditorFollowerComponent,
    EditorFollowedComponent,
    EditorMypostComponent,
    EditorConfigComponent,
    EditorForyouComponent
  ]
})
export class EditorModule { }
