import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIpComponent } from './admin-ip.component';

describe('AdminIpComponent', () => {
  let component: AdminIpComponent;
  let fixture: ComponentFixture<AdminIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
