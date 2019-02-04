import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeLastComponent } from './home-last/home-last.component';
import { HomeForyouComponent } from './home-foryou/home-foryou.component';
import { HomeCategoryComponent } from './home-category/home-category.component';
import { CanReadGuard } from '../../core/can-read.guard';
import { LayoutModule } from '../../layouts/layout.module';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../material.module';
import { ScrollingModule  } from '@angular/cdk/scrolling';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: HomeLastComponent },
      { path: 'foryou', component: HomeForyouComponent, canActivate: [CanReadGuard] },
      { path: ':name', component: HomeCategoryComponent }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    LayoutModule,
    MomentModule,
    MaterialModule,
    ScrollingModule
  ],
  declarations: [
    HomeComponent,
    HomeLastComponent,
    HomeForyouComponent,
    HomeCategoryComponent
  ]
})
export class HomeModule { }
