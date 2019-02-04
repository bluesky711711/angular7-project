import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostEditorComponent } from './pages/post-editor/post-editor.component';
import { PostComponent } from './pages/post/post.component';
import { SearchComponent } from './pages/search/search.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
// import { ContributorsComponent } from './pages/contributors/contributors.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { CategoryComponent } from './pages/category/category.component';
import { ErrorComponent } from './pages/error/error.component';

// Guards
import { EditorGuard } from './core/editor.guard';
import { CanReadGuard } from './core/can-read.guard';
import { AppCustomPreloader } from './core/app-routing-loader';
import { BecomeComponent } from './pages/become/become.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'index', redirectTo: 'home' },
  { path: 'home', loadChildren: './pages/home/home.module#HomeModule'  },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule' },
  { path: 'editor/:id', loadChildren: './pages/editor/editor.module#EditorModule' },
  { path: 'user/:id', loadChildren: './pages/user/user.module#UserModule' },
  { path: 'post/:category/:id', component: PostComponent},
  { path: 'post-editor/:id', component: PostEditorComponent, canActivate: [EditorGuard]},
  { path: 'topic/:id', component: CategoryComponent},
  { path: 'search', component: SearchComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'become', component: BecomeComponent },
  { path: 'topics', component: TopicsComponent, canActivate: [CanReadGuard]},
  // { path: 'contributors', component: ContributorsComponent},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  // imports:[RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload',
    // preloadingStrategy: AppCustomPreloader
  })],
  // imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
