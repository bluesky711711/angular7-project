import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeRangeSelectorComponent } from './age-range-selector.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';

describe('AgeRangeSelectorComponent', () => {
  let component: AgeRangeSelectorComponent;
  let fixture: ComponentFixture<AgeRangeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule],
      declarations: [ AgeRangeSelectorComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeRangeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
