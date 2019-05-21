import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-seller-order-requests',
  templateUrl: './seller-order-requests.component.html',
  styleUrls: ['./seller-order-requests.component.css']
})
export class SellerOrderRequestsComponent implements OnInit {

  @ViewChild('disputeForm') mytemplateForm1: NgForm;
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
  queryString: any;
  p: any;
  e: any;
  userData: any = {};
  disputeMailData: any = {};
  disputeData: any;
  submitted: any;
  id = '';

  private sendMailForReject =
    'https://uzhavarsanthai.herokuapp.com/api/sendMailRejectSeller';
  private disputeMail = 'https://uzhavarsanthai.herokuapp.com/api/sendDisputeMail';

  constructor(
    private _dealService: DealsService,
    private http: HttpClient,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.createdRequests.length; i++) {
      this.createdRequests.push(`deal ${i}.0`);
    }
    for (let i = 1; i <= this.cancelledRequests.length; i++) {
      this.cancelledRequests.push(`deal ${i}.0`);
    }
  }

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
        this.cancelledErrMsg = '';
        this.createdRequests = [];
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
    this.singleOrderRequest.sellerStatus = 'Order cancelled';
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

  updatePost(id) {
    this.singleOrderRequest.orderStatus = 'Order cancelled';
    this._dealService.addOrderReqPost(this.singleOrderRequest, id).subscribe(
      data => {
        this.loadingCtrl.hide();
        console.log(data);
        this.getSingleOrder();
        this.successMsg = 'Rejected successfully!';
        setTimeout(() => {
          this.successMsg = '';
        }, 3000);
        if (data) {
          this.http
            .post<any>(this.sendMailForReject, this.singleOrderRequest)
            .subscribe(
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
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

  disputeSave() {
    var a = "UZ";
    let reqId = Math.floor(100000 + Math.random() * 900000);
    this.userData.ticketId = a + "-" + reqId;
    this.userData.buyerName = this.singleOrderRequest.buyerName;
    this.userData.buyerId = this.singleOrderRequest.buyerId;
    this.userData.disputerName = this.singleOrderRequest.sellerName;
    this.userData.disputerId = this.singleOrderRequest.sellerId;
    this.userData.productId = this.singleOrderRequest.prdctId;
    this.userData.orderRqstId = this.singleOrderRequest._id;
    this.userData.requestId = this.singleOrderRequest.requestId
    this.userData.dispute = this.userData.dispute;
    this.userData.disputeStatus = 'Created';
    this.userData.against = 'buyer';
    let curntDte = new Date().getTime();
    this.userData.createdAt = curntDte;
    console.log(this.userData);

    this._dealService.disputePost(this.userData).subscribe(
      data => {
        console.log(data);
        this.userData.disputeId = data._id;
        this.disputeData = data.dispute;
        this.updatePostDispute();
        this.mytemplateForm1.reset();
        this.formReset();
        document.getElementById('closeCancelOrderModal').click();
      },
      err => {
        console.log(err);
      }
    );
  }

  updatePostDispute() {
    this._dealService
      .updatePostDispute(this.userData, this.userData.productId)
      .subscribe(
        data => {
          console.log(data);
          this.updateUserDispute();
          this.updateUserSellerDispute();
        },
        err => {
          console.log(err);
        }
      );
  }

  updateUserDispute() {
    this.userData.dispute = this.disputeData;
    this._dealService
      .updateUserDispute(this.userData, this.userData.buyerId)
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }

  updateUserSellerDispute() {
    this.userData.dispute = this.disputeData;
    this._dealService
      .updateSellerUserDispute(this.userData, this.userData.disputerId)
      .subscribe(
        data => {
          console.log(data);
          this.disputeMailSend();
        },
        err => {
          console.log(err);
        }
      );
  }

  disputeMailSend() {
    var todate = new Date(this.userData.createdAt).getDate();
    var tomonth = new Date(this.userData.createdAt).getMonth() + 1;
    var toyear = new Date(this.userData.createdAt).getFullYear();

    this.disputeMailData = this.userData;
    this.disputeMailData.createdAt = tomonth + '/' + todate + '/' + toyear;
    this.disputeMailData.sellerPhone = this.singleOrderRequest.sellerPhone;
    this.disputeMailData.prdctCategory = this.singleOrderRequest.prdctCategory;
    this.disputeMailData.requestId = this.singleOrderRequest.requestId;
    this.disputeMailData.prdctName = this.singleOrderRequest.prdctName;

    console.log(this.disputeMailData);
    this.http.post<any>(this.disputeMail, this.disputeMailData).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  formReset(){
    this.mytemplateForm1.reset();
  }

}
