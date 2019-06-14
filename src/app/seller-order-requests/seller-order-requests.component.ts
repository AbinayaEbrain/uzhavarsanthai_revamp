import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  crntUser: any = {};
  roleStatus: any;
  role: any;
  public trackInformationData: any = {};

  private sendMailForReject =
    'https://uzhavarsanthai.herokuapp.com/api/sendMailRejectSeller';
  private disputeMail = 'https://uzhavarsanthai.herokuapp.com/api/sendDisputeMail';

  constructor(
    private _dealService: DealsService,
    private http: HttpClient,
    private router: Router,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {
    for (let i = 1; i <= this.createdRequests.length; i++) {
      this.createdRequests.push(`deal ${i}.0`);
    }
    for (let i = 1; i <= this.cancelledRequests.length; i++) {
      this.cancelledRequests.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
      document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.acntID);
    this.getSingleUser();
  }

  goToBack() {
    this.location.back();
  }

  getSingleUser(){
    this._dealService.getSingleUser(this.acntID).subscribe(data =>{
      console.log(data);
      this.crntUser = data;
      this.roleStatus = data.roleStatus;
      this.role = data.role;
      if(this.role == "buyer" || this.roleStatus =="Deactive"){
        this.loadingCtrl.hide();
      }

      if(this.role == "seller" && this.roleStatus =="Active"){
        this.getSignUpRqst();
      }
      this.trackInformationData.response = 'Success';
      this.trackInformationData.apiName = 'getSingleUser';
      this.postTrackInformation();
    },err =>{
      console.log(err);
      this.trackInformationData.response = 'Failure';
      this.trackInformationData.error = err.statusText;
      this.trackInformationData.apiName = 'getSingleUser';
      this.postTrackInformation();
    })

  }

  getSignUpRqst() {
    this._dealService.getOrderRequest().subscribe(
      data => {
        console.log(data);
        this.getSingleOrder();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getorderrequest';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'getorderrequest';
        this.postTrackInformation();
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
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getSingleOrderRequest';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'getSingleOrderRequest';
        this.postTrackInformation();
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
    console.log(this.createdRequests);
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
      if (this.orderRequests[i].status != 'Order created' && this.orderRequests[i].status != 'Closed') {
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
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getSingleOrderRequest1';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'getSingleOrderRequest1';
        this.postTrackInformation();
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
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateorderrequest';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateorderrequest';
          this.postTrackInformation();
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
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'orderReqPost';
        this.postTrackInformation();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'orderReqPost';
        this.postTrackInformation();
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
        document.getElementById("openConfirmModal").click();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'disputePost';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'disputePost';
        this.postTrackInformation();
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
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateDisputePost';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateDisputePost';
          this.postTrackInformation();
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
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateDisputeUser';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateDisputeUser';
          this.postTrackInformation();
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
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateDisputeUserSeller';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateDisputeUserSeller';
          this.postTrackInformation();
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

  postTrackInformation() {
    let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    let token = localStorage.getItem('token');
    let UserName = localStorage.getItem('firstname');
    let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
    this.trackInformationData.UserId = acntID;
    this.trackInformationData.jwt = token;
    this.trackInformationData.ipAddress = ipAddress;
    this.trackInformationData.UserName = UserName;
    this.trackInformationData.apiCallingAt = new Date().getTime();
    this._dealService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }

}
