import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationdealsComponent } from './locationdeals.component';

describe('LocationdealsComponent', () => {
  let component: LocationdealsComponent;
  let fixture: ComponentFixture<LocationdealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationdealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationdealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
