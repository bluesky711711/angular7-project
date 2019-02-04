import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Angular
import { MaterialModule } from '../material.module';

// Components layout
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { DatatableUsersComponent } from './datatable-users/datatable-users.component';
import { DatatablePostsComponent } from './datatable-posts/datatable-posts.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { TagChipComponent } from './tag-chip/tag-chip.component';
import { FooterComponent } from './footer/footer.component';
import { AgeRangeSelectorComponent } from './age-range-selector/age-range-selector.component';
import { OccupationSelectorComponent } from './occupation-selector/occupation-selector.component';
import { PositionSelectorComponent } from './position-selector/position-selector.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { EditorsHomeComponent } from './editors-home/editors-home.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { MoreReadHomeComponent } from './more-read-home/more-read-home.component';
import { TrendingBarComponent } from './trending-bar/trending-bar.component';
import { RecommendedHomeComponent } from './recommended-home/recommended-home.component';
import { DatatableCategoriesComponent } from './datatable-categories/datatable-categories.component';
import { DatatableTagsComponent } from './datatable-tags/datatable-tags.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';
import { RecommendedPostComponent } from './recommended-post/recommended-post.component';
import { ImageCropEditorComponent } from './image-crop-editor/image-crop-editor.component';
import { HeaderNavPostComponent } from './header-nav-post/header-nav-post.component';
import { TrendingColumnComponent } from '../layouts/trending-column/trending-column.component';
import { SwiperRecommendedComponent } from './swiper-recommended/swiper-recommended.component';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';


// Services
import { UserService } from '../services/user.service';
import { EditorService } from '../services/editor.service';
import { PostService } from '../services/post.service';
import { CategoryService } from '../services/category.service';
import { TagService } from '../services/tag.service';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { AgeService } from '../services/age.service';
import { OccupationService } from '../services/occupation.service';
import { PositionService } from '../services/position.service';
import { PaginationService } from '../services/pagination.service';
import { FollowerService } from '../services/follower.service';
import { BookmarkService } from '../services/bookmark.service';

// Utils
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { ImageCropperModule } from 'ngx-img-cropper';
import { DisqusModule } from 'ngx-disqus';
import { SWIPER_CONFIG, SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(fas);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};


// Pipes
import { ToDatePipe } from '../pipes/to-date.pipe';
import { ToUserPipe } from '../pipes/to-user.pipe';
import { ToPostPipe } from '../pipes/to-post.pipe';
import { ToPostImagePipe } from '../pipes/to-post-image.pipe';
import { FileSizePipe } from '../pipes/filesize';
import { ToReadTimePipe } from '../pipes/to-read-time.pipe';
import { ToStringPipe } from '../pipes/to-string.pipe';
import { ToCategoryPipe } from '../pipes/to-category.pipe';
import { ToTagPipe } from '../pipes/to-tag.pipe';
import { SafeHtmlPipe } from '../pipes/to-safe-html.pipe';
import { ToFirstnamePipe } from '../pipes/to-firstname.pipe';
import { ToPositionPipe } from '../pipes/to-position.pipe';
import { ToNumberPipe } from '../pipes/to-number.pipe';
import { ToURLPipe } from '../pipes/to-url.pipe';
import { AuthService } from '../core/auth.service';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ItemPostComponent } from './item-post/item-post.component';
import { CategoryTagComponent } from './category-tag/category-tag.component';
import { TopicService } from '../services/topic.service';
import { SubcategoryDialogComponent } from './subcategory-dialog/subcategory-dialog.component';



const modules = [
    HeaderNavComponent,
    DatatableUsersComponent,
    DatatablePostsComponent,
    CategorySelectorComponent,
    TagChipComponent,
    ImageCropComponent,
    FooterComponent,
    OccupationSelectorComponent,
    PositionSelectorComponent,
    LoadingSpinnerComponent,
    EditorsHomeComponent,
    SliderHomeComponent,
    MoreReadHomeComponent,
    TrendingBarComponent,
    RecommendedHomeComponent,
    AgeRangeSelectorComponent,
    DatatableCategoriesComponent,
    DatatableTagsComponent,
    CategoryDialogComponent,
    TagDialogComponent,
    RecommendedPostComponent,
    ImageCropEditorComponent,
    HeaderNavPostComponent,
    TrendingColumnComponent,
    SwiperRecommendedComponent,
    MenuMobileComponent,
    BookmarkComponent,
    ItemPostComponent,
    CategoryTagComponent,
    SubcategoryDialogComponent,
    // Pipes
    ToDatePipe,
    ToUserPipe,
    ToPostPipe,
    ToCategoryPipe,
    ToTagPipe,
    ToPostImagePipe,
    ToReadTimePipe,
    ToStringPipe,
    SafeHtmlPipe,
    ToFirstnamePipe,
    FileSizePipe,
    ToPositionPipe,
    ToNumberPipe,
    ToURLPipe

];

const services = [
    AuthService,
    UserService,
    EditorService,
    PostService,
    CategoryService,
    TopicService,
    TagService,
    AgeService,
    OccupationService,
    PositionService,
    PaginationService,
    FollowerService,
    BookmarkService,
];

@NgModule({
    declarations: [...modules],
    exports: [...modules, ImageCropperModule],
    imports: [
        MaterialModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MomentModule,
        DisqusModule.forRoot('piensadigital'),
        ImageCropperModule,
        SwiperModule,
        FontAwesomeModule
    ],
    providers: [...services, { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }]
})
export class LayoutModule { }
