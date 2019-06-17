import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketreadmoreComponent } from './ticketreadmore.component';

describe('TicketreadmoreComponent', () => {
  let component: TicketreadmoreComponent;
  let fixture: ComponentFixture<TicketreadmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketreadmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketreadmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
