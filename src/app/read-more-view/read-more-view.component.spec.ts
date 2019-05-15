import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreViewComponent } from './read-more-view.component';

describe('ReadMoreViewComponent', () => {
  let component: ReadMoreViewComponent;
  let fixture: ComponentFixture<ReadMoreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMoreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
