import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDealsComponent } from './admin-deals.component';

describe('AdminDealsComponent', () => {
  let component: AdminDealsComponent;
  let fixture: ComponentFixture<AdminDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
