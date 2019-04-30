import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-seller-order-requests',
  templateUrl: './seller-order-requests.component.html',
  styleUrls: ['./seller-order-requests.component.css']
})
export class SellerOrderRequestsComponent implements OnInit {
  orderRequests: any = [];
  acntID: any;
  errMsg: any;
  cancelledErrMsg: any;
  singleOrderRequest: any = {};
  cancelledRequests: any = [];

  constructor(private _dealService: DealsService) {}

  ngOnInit() {
    this.acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.acntID);
    this.getSignUpRqst();
  }

  getSignUpRqst() {
    this._dealService.getOrderRequest().subscribe(
      data => {
        console.log(data);
        this.getSingleOrder();
      },
      err => {
        console.log(err);
      }
    );
  }

  getSingleOrder() {
    this._dealService.getSingleOrderRequest(this.acntID).subscribe(
      data => {
        console.log(data);
        this.orderRequests = data;
        if (this.orderRequests.length == 0) {
          this.errMsg = 'No order requests!';
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getCancelledRequests(){
    let j = 0;
    for(let i = 0;i < this.orderRequests.length ; i++){
      if(this.orderRequests[i].status == "Order cancelled"){
        this.cancelledRequests[j] = this.orderRequests[i];
        j++;
      }
    }
    console.log(this.cancelledRequests);
    if (this.cancelledRequests.length == 0) {
      this.cancelledErrMsg = 'No cancelled order requests!';
    }
  }

  view(id) {
    console.log(id);
    this._dealService.getSingleOrderRequest1(id).subscribe(
      data => {
        console.log(data);
        this.singleOrderRequest = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
