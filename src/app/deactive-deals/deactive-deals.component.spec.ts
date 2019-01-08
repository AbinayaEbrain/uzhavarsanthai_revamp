import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveDealsComponent } from './deactive-deals.component';

describe('DeactiveDealsComponent', () => {
  let component: DeactiveDealsComponent;
  let fixture: ComponentFixture<DeactiveDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactiveDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactiveDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
