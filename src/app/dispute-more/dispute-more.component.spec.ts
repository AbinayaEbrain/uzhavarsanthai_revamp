import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeMoreComponent } from './dispute-more.component';

describe('DisputeMoreComponent', () => {
  let component: DisputeMoreComponent;
  let fixture: ComponentFixture<DisputeMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisputeMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
