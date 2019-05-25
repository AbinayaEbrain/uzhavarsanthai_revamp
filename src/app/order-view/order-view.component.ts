import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {

  userOrderReq = [];
  userOrder :any = [];
  userOrder1 : any = {};
  id: any;


  constructor(
    private _dealService: DealsService
  ) { }

  ngOnInit() {
    this.getSignupReq();
  }

  getSignupReq() {
    let j = 0;
    this._dealService.getOrderRequest().subscribe(res =>{
      let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(acntID);
    console.log(res);
    this.userOrderReq = res;
    for (let i = 0; i < this.userOrderReq.length; i++) {
      if (
        acntID == this.userOrderReq[i].buyerId
      ) {
        this.userOrder[j] = this.userOrderReq[i];
        console.log(this.userOrder)
        j++;
      }
    }
    // this.filterMonth();
    },err =>{
      console.log(err);
    });
  }

  singleUpdateSignupReq(id){
    this.id = id;
    for (let i = 0; i < this.userOrder.length; i++) {
      if (this.id == this.userOrder[i]._id) {
        this.userOrder1 = this.userOrder[i];
      }
    }
  }

}
