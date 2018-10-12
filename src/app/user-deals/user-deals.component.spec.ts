import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDealsComponent } from './user-deals.component';

describe('UserDealsComponent', () => {
  let component: UserDealsComponent;
  let fixture: ComponentFixture<UserDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
