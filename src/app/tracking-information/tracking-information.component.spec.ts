import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingInformationComponent } from './tracking-information.component';

describe('TrackingInformationComponent', () => {
  let component: TrackingInformationComponent;
  let fixture: ComponentFixture<TrackingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
