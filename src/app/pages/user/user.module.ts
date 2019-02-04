import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { UserForyouComponent } from './user-foryou/user-foryou.component';
import { UserBookmarksComponent } from './user-bookmarks/user-bookmarks.component';
import { UserConfigComponent } from './user-config/user-config.component';
import { SubscriberGuard } from '../../core/subscriber.guard';
import { LayoutModule } from '../../layouts/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../material.module';
import { UserFollowedComponent } from './user-followed/user-followed.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'foryou', component: UserForyouComponent, canActivate: [SubscriberGuard] },
      { path: 'bookmarks', component: UserBookmarksComponent, canActivate: [SubscriberGuard] },
      { path: 'followed', component: UserFollowedComponent, canActivate: [SubscriberGuard] },
      { path: 'config', component: UserConfigComponent, canActivate: [SubscriberGuard] },
    ],
    canActivate: [SubscriberGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    MaterialModule
  ],
  declarations: [
    UserForyouComponent,
    UserBookmarksComponent,
    UserConfigComponent,
    UserFollowedComponent,
    UserComponent
  ]
})
export class UserModule { }
