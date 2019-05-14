import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSellingProductComponent } from './most-selling-product.component';

describe('MostSellingProductComponent', () => {
  let component: MostSellingProductComponent;
  let fixture: ComponentFixture<MostSellingProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSellingProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSellingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
