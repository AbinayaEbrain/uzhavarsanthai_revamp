import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

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
  createdErrMsg: any;
  singleOrderRequest: any = {};
  cancelledRequests: any = [];
  createdRequests: any = [];
  rejectId: any;
  successMsg: any;
  queryString:any;
  p:any;
  e:any;
  private sendMailForReject = 'https://uzhavarsanthai.herokuapp.com/api/sendMailRejectSeller'

  constructor(private _dealService: DealsService,private http: HttpClient,public loadingCtrl: NgxSpinnerService) {}

  ngOnInit() {
    this.loadingCtrl.show();
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
        this.getCreatedRequests();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCreatedRequests() {
    let j = 0;
    for (let i = 0; i < this.orderRequests.length; i++) {
      if (this.orderRequests[i].status == 'Order created') {
        this.createdRequests[j] = this.orderRequests[i];
        j++;
      }
    }
    if (this.createdRequests.length == 0) {
      this.errMsg = 'No order requests!';
    }
    console.log(this.createdRequests);
    this.loadingCtrl.hide();
  }

  getCancelledRequests() {
    this.loadingCtrl.show();
    let j = 0;
    for (let i = 0; i < this.orderRequests.length; i++) {
      if (this.orderRequests[i].status == 'Order cancelled') {
        this.cancelledRequests[j] = this.orderRequests[i];
        j++;
      }
    }
    console.log(this.cancelledRequests);
    if (this.cancelledRequests.length == 0) {
      this.cancelledErrMsg = 'No cancelled order requests!';
    }
    this.loadingCtrl.hide();
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

  getId(id) {
    this.rejectId = id;
    this.view(id);
    console.log(this.rejectId);
  }

  reject() {
    this.loadingCtrl.show();
    console.log(this.rejectId);
    this.singleOrderRequest.status = 'Order cancelled';
    console.log(this.singleOrderRequest);
    this._dealService
      .editOrderRequest(this.singleOrderRequest, this.rejectId)
      .subscribe(
        data => {
          console.log(data);
          this.updatePost(this.singleOrderRequest.prdctId);
        },
        err => {
          console.log(err);
        }
      );
  }

  updatePost(id){
    console.log(id);
    this.singleOrderRequest.orderStatus = 'Order cancelled';
    this._dealService.addOrderReqPost(this.singleOrderRequest,id).subscribe(data =>{
      this.loadingCtrl.show();
      console.log(data);
      this.getSingleOrder();
      this.successMsg = "Rejected successfully!";
      setTimeout(() => {
        this.successMsg = '';
      }, 3000);
      if (data) {
        this.http.post<any>(this.sendMailForReject, this.singleOrderRequest).subscribe(
          data => {
            if (data) {
              console.log(data);
              console.log('success');
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    }, err => {
      this.loadingCtrl.hide();
      console.log(err);
    })
  }
}
