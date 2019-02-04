import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeComponent } from './become.component';

describe('BecomeComponent', () => {
  let component: BecomeComponent;
  let fixture: ComponentFixture<BecomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
