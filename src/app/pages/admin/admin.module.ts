import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { AdminTagsComponent } from './admin-tags/admin-tags.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminComponent } from './admin/admin.component';

import { LayoutModule } from '../../layouts/layout.module';

import { AdminEditorGuard } from '../../core/admin-editor.guard';

export const AdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: AdminUsersComponent, canActivate: [AdminEditorGuard] },
      { path: 'posts', component: AdminPostsComponent, canActivate: [AdminEditorGuard] },
      { path: 'categories', component: AdminCategoriesComponent, canActivate: [AdminEditorGuard] },
      { path: 'tags', component: AdminTagsComponent, canActivate: [AdminEditorGuard] }
    ],
    canActivate: [AdminEditorGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    LayoutModule
  ],
  declarations: [
    AdminCategoriesComponent,
    AdminPostsComponent,
    AdminTagsComponent,
    AdminUsersComponent,
    AdminComponent
  ]
})
export class AdminModule { }
