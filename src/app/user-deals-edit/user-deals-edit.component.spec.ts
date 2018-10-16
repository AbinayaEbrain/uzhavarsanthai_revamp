import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDealsEditComponent } from './user-deals-edit.component';

describe('UserDealsEditComponent', () => {
  let component: UserDealsEditComponent;
  let fixture: ComponentFixture<UserDealsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDealsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDealsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
