import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDisputeComponent } from './admin-dispute.component';

describe('AdminDisputeComponent', () => {
  let component: AdminDisputeComponent;
  let fixture: ComponentFixture<AdminDisputeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDisputeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
