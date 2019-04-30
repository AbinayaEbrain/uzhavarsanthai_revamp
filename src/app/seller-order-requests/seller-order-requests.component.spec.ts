import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderRequestsComponent } from './seller-order-requests.component';

describe('SellerOrderRequestsComponent', () => {
  let component: SellerOrderRequestsComponent;
  let fixture: ComponentFixture<SellerOrderRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerOrderRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerOrderRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
