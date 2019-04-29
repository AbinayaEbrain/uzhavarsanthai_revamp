import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.css']
})
export class OrderRequestComponent implements OnInit {

  userOrderReq = [];

  constructor(
    private _dealService: DealsService,
    private _auth: AuthService
  ) {
    for (let i = 1; i <= this.userOrderReq.length; i++) {
      this.userOrderReq.push('Angular ${i}.0');
    }
   }

  ngOnInit() {
    this.getSignupReq()
  }

  getSignupReq(){
    this._dealService.getOrderRequest().subscribe(res =>{
    console.log(res);
    this.userOrderReq = res;
    },err =>{
      console.log(err);
    });
  }

}
