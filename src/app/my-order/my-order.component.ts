import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  userOrderReq = [];
  userOrder :any = [];
  id: any;
  userOrder1 : any = {};

  constructor(
    private _dealService: DealsService,
  ) { }

  ngOnInit() {
    this.getSignupReq();
  }

  getSignupReq(){
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
    console.log(this.userOrder1)
  }

}
