import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealscategoryComponent } from './dealscategory.component';

describe('DealscategoryComponent', () => {
  let component: DealscategoryComponent;
  let fixture: ComponentFixture<DealscategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealscategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealscategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
