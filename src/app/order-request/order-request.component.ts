import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.css']
})
export class OrderRequestComponent implements OnInit {
  successMsg: any;
  errorMsg: any;
  userCategory: any = [];
  constructor() { }

  ngOnInit() {
  }

}
