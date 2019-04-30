import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  successMsg = '';
  userOrderReq = [];
  userOrder :any = [];
  id: any;
  prdcIid : any;
  userOrder1 : any = {};
  userOrder2 : any = {};
  errorMsg = '';

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
    if (this.userOrder.length == 0) {
      this.errorMsg = 'No order request';
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

  singleUpdateSignupReq1(id){
    this.id = id;
    console.log(this.id )
    for (let i = 0; i < this.userOrder.length; i++) {
      console.log(this.userOrder);
      console.log(this.userOrder.length);
      if (this.id == this.userOrder[i]._id) {
       this.userOrder1 = this.userOrder[i];
       this. updateSignupReq1(id)
      }
    }
    console.log(this.userOrder1)
  }

  updateSignupReq1(id) {
    this.prdcIid = id;
    console.log(this.prdcIid)
    this.userOrder1.status = 'Order cancelled';
       this._dealService.editOrderRequest(this.userOrder1,this.prdcIid).subscribe(
      res => {
        console.log(res);
        this.updateSignupReq(id)
             this.successMsg = 'Your order is cancelled';
              setTimeout(() => {
                this.successMsg = '';
              }, 2000);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSignupReq(id) {
    this.id = id;
    this.userOrder1.orderStatus = 'Order cancelled';
       this._dealService.addOrderReqPost(this.userOrder1,this.id).subscribe(
      res => {
        console.log(res);
          //  this.successMsg = 'Accepted user request';
          //     setTimeout(() => {
          //       this.successMsg = '';
          //     }, 2000);
      },
      err => {
        console.log(err);
      }
    );
  }

}
