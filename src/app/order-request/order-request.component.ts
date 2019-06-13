import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { AuthService } from 'src/app/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.css']
})
export class OrderRequestComponent implements OnInit {
  userOrderReq = [];
  successMsg: any;
  errorMsg: any;
  userCategory: any = [];
  userOrderReq1: any = [];
  userOrderReq2: any = [];
  d: any;
  id: any;
  errMsg = '';
  credits: any = {};
  creditObj: any = {};
  creditMinus: any;
  splitImage = '';
  public trackInformationData: any = {};


  constructor(
    private _dealService: DealsService,
    private _auth: AuthService,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.userOrderReq1.length; i++) {
      this.userOrderReq1.push('Angular ${i}.0');
    }
  }

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    this.getSignupReq();
  }

  getSignupReq() {
    this.userOrderReq1 = [];
    this.loadingCtrl.show();
    this._dealService.getOrderRequest().subscribe(res => {
      console.log(res);
      this.userOrderReq = res;
      this.errMsg = '';
      this.loadingCtrl.hide();

      let j = 0;
      for (let i = 0; i < this.userOrderReq.length; i++) {
        if (
          this.userOrderReq[i].sellerStatus != 'Closed' &&
          this.userOrderReq[i].status != 'Closed'
        ) {
          this.userOrderReq1[j] = this.userOrderReq[i];
          j++;
        }
      }
      console.log(this.userOrderReq1);
      if (this.userOrderReq1.length == 0) {
        this.errMsg = 'No order request';
      }
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


  singleUpdateSignupReq1(id) {
    this.id = id;
    for (let i = 0; i < this.userOrderReq1.length; i++) {
      if (this.id == this.userOrderReq1[i]._id) {
        this.userOrderReq2 = this.userOrderReq1[i];
      }
    }
    console.log(this.userOrderReq2);
    this.getSingleUser();
  }

  getSingleUser() {
    this._dealService.getSingleUser(this.userOrderReq2.sellerId).subscribe(
      data => {
        console.log(data);
        this.credits = data;
        console.log(this.credits);
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getSingleUser';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'getSingleUser';
        this.postTrackInformation();
      }
    );
  }

  closeOrderRequest() {
    console.log(this.id);
    this.creditMinus =
      this.userOrderReq2.prdctPrice *
      this.userOrderReq2.requiredQuantity *
      (1 / 100);
    console.log(this.creditMinus);
    this.loadingCtrl.show();
    this.userOrderReq2.sellerStatus = 'Closed';
    this.userOrderReq2.status = 'Closed';
    this._dealService
      .updateOrderRequestStatus(this.userOrderReq2, this.id)
      .subscribe(
        res => {
          console.log(res);
          this.updatePostOrderqst();
          this.updateUser();
          this.loadingCtrl.hide();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'mapuserOrderRequestStatus';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'mapuserOrderRequestStatus';
          this.postTrackInformation();
        }
      );
  }

  updateUser() {
    this.credits.credits = this.credits.credits - this.creditMinus;
    console.log(this.credits.credits);
    this._dealService
      .updateCustomer(this.credits, this.userOrderReq2.sellerId)
      .subscribe(
        res => {
          console.log(res);
          this.updateCreditArr();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateuser';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateuser';
          this.postTrackInformation();
        }
      );
    }

  dropOrderRequest() {
    this.loadingCtrl.show();
    this.userOrderReq2.sellerStatus = 'Order dropped';
    this.userOrderReq2.status = 'Order dropped';
    this._dealService
      .updateOrderRequestStatus(this.userOrderReq2, this.id)
      .subscribe(
        res => {
          console.log(res);
          this.loadingCtrl.hide();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'mapuserOrderRequestStatus';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'mapuserOrderRequestStatus';
          this.postTrackInformation();
        }
      );
  }

  updateCreditArr() {
    this.creditObj.credit = this.creditMinus;
    this.creditObj.productName = this.userOrderReq2.prdctName;
    this.creditObj.category = this.userOrderReq2.prdctCategory;
    this.creditObj.quantity = this.userOrderReq2.requiredQuantity;
    this.creditObj.price = this.userOrderReq2.prdctPrice;
    this.splitImage = this.userOrderReq2.image;
    this.creditObj.image = this.splitImage.split(',', 1);
    let crntDate = new Date().getTime();
    this.creditObj.productCreatedAt = crntDate;
    console.log(this.creditObj);

    this._dealService
      .updateUserCreditArr(this.creditObj, this.userOrderReq2.sellerId)
      .subscribe(
        res => {
          console.log(res);
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateCreditArr';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateCreditArr';
          this.postTrackInformation();
        }
      );
  }

  updatePostOrderqst() {
    this.userOrderReq2.orderStatus = 'Closed';
    console.log(this.userOrderReq2);
    this._dealService
      .addOrderReqPost(this.userOrderReq2, this.userOrderReq2.prdctId)
      .subscribe(
        data => {
          console.log(data);
          this.getSignupReq();
          this.updatePost();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'orderReqPost';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'orderReqPost';
          this.postTrackInformation();
        }
      );
  }

  updatePost() {
    this.userOrderReq2.quantity = (this.userOrderReq2.prdctQty - this.userOrderReq2.requiredQuantity);
    console.log(this.userOrderReq2.quantity);
    this._dealService
      .productUpdate(this.userOrderReq2, this.userOrderReq2.prdctId)
      .subscribe(
        res => {
          console.log(res);
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'productUpdate';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'productUpdate';
          this.postTrackInformation();
        }
      );
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
