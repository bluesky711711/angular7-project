import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableTagsComponent } from './datatable-tags.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { MaterialModule } from '../../material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToDatePipe } from '../../pipes/to-date.pipe';

describe('DatatableTagsComponent', () => {
  let component: DatatableTagsComponent;
  let fixture: ComponentFixture<DatatableTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MomentModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        NoopAnimationsModule,
      ],
      declarations: [DatatableTagsComponent, ToDatePipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
