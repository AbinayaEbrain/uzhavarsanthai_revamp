import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  successMsg = '';
  userOrderReq = [];
  userOrder :any = [];
  createdRequests: any = [];
  cancelledRequests: any = [];
  id: any;
  prdcIid : any;
  userOrder1 : any = {};
  userOrder2 : any = {};
  errorMsg = '';
  cancelledErrMsg = '';
  d:any;
  private orderCancelmail = 'https://uzhavarsanthai.herokuapp.com/api/sendordercancelrequest';

  constructor(
    private _dealService: DealsService,
    private http: HttpClient,
    public loadingCtrl: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getSignupReq();
  }

  getSignupReq(){
    this.loadingCtrl.show();
    let j = 0;
    let curntDte = new Date().getTime();
    this.userOrder.createdAt = curntDte;
    console.log(this.userOrder.createdAt)
    this._dealService.getOrderRequest().subscribe(res =>{
      let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(acntID);
    console.log(res);
    this.userOrderReq = res;
    this.loadingCtrl.hide();
    for (let i = 0; i < this.userOrderReq.length; i++) {
      if (
        acntID == this.userOrderReq[i].buyerId
      ) {
        this.userOrder[j] = this.userOrderReq[i];
        console.log(this.userOrder)
        j++;
      }
    }
    this.createdRequests = [];
    this.getCreatedRequests();
    if (this.userOrder.length == 0) {
      this.errorMsg = 'No orders';
    }
    },err =>{
      console.log(err);
    });
  }

  getCreatedRequests() {
    console.log(this.userOrder)
    let j = 0;
    for (let i = 0; i < this.userOrder.length; i++) {
      console.log(this.userOrder[i].status);
      if (this.userOrder[i].status == 'Order created') {
        this.createdRequests[j] = this.userOrder[i];
        j++;
      }
    }
    if (this.createdRequests.length == 0) {
      this.errorMsg = 'No order requests!';
    }
    console.log(this.createdRequests);
    this.loadingCtrl.hide();
  }

  getCancelledRequests() {
    this.loadingCtrl.show();
    let j = 0;
    for (let i = 0; i < this.userOrder.length; i++) {
      if (this.userOrder[i].status == 'Order cancelled') {
        this.cancelledRequests[j] = this.userOrder[i];
        j++;
      }
    }
    console.log(this.cancelledRequests);
    if (this.cancelledRequests.length == 0) {
      this.cancelledErrMsg = 'No cancelled order requests!';
    }
    this.loadingCtrl.hide();
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
      }
    }
    console.log(this.userOrder1)
  }

  updateSignupReq1() {
    console.log(this.id)
    this.userOrder1.status = 'Order cancelled';
       this._dealService.editOrderRequest(this.userOrder1,this.id).subscribe(
      res => {
        console.log(res);
        this.updateSignupReq(this.userOrder1.prdctId);
             this.successMsg = 'Your order is cancelled';
              setTimeout(() => {
                this.successMsg = '';
              }, 2000);
           this.getSignupReq();   
      },
      err => {
        console.log(err);
      }
    );
  }

  updateSignupReq(id) {
    this.userOrder1.orderStatus = 'Order cancelled';
       this._dealService.addOrderReqPost(this.userOrder1,id).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.http.post<any>(this.orderCancelmail, this.userOrder1).subscribe(
            data => {
              if (data) {
                console.log(data);
                console.log('success');
              }
              this.getSignupReq();
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
