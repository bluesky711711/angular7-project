import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingBarComponent } from './trending-bar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { ToastrModule } from 'ngx-toastr';

describe('TrendingBarComponent', () => {
  let component: TrendingBarComponent;
  let fixture: ComponentFixture<TrendingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot()
      ],
      declarations: [TrendingBarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
