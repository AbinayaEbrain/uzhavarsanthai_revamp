import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerAsSellerComponent } from './buyer-as-seller.component';

describe('BuyerAsSellerComponent', () => {
  let component: BuyerAsSellerComponent;
  let fixture: ComponentFixture<BuyerAsSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerAsSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerAsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
