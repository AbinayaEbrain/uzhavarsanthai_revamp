import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/deals.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


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
  recentErrMsg = '';
  pastErrMsg = '';
  d:any;
  private orderCancelmail = 'https://uzhavarsanthai.herokuapp.com/api/sendordercancelrequest';
  private disputeMail = 'http://localhost:5000/api/sendDisputeMail';
  recentOrder :any = [];
  pastOrder :any = [];
  count : any;
  rating ="";
  public reviewData: any = {};
  p:any;
  @ViewChild('reviewform') mytemplateForm: NgForm;
  userData: any = {};
  disputeData: any;
  disputeMailData: any = {};

  constructor(
    private _dealService: DealsService,
    private http: HttpClient,
    private router: ActivatedRoute,
    private route: Router ,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getSignupReq();
  }

  getSignupReq() {
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
    this.filterMonth();
    },err =>{
      console.log(err);
    });
  }

   filterMonth(){
    let j = 0;
    let k = 0;
    for (let i = 0; i < this.userOrder.length; i++) {
      let today = new Date()
      let past = new Date(this.userOrder[i].createdAt);
      var a = this.calcDate(today,past)
      console.log(a)
      if ( a <= 1 ) {
        this.recentOrder[j] = this.userOrder[i];
        j++;
      } else {
        this.pastOrder[k] = this.userOrder[i];
        k++;
      }
    }
    console.log(this.recentOrder)
    console.log(this.pastOrder)
    if (this.recentOrder.length == 0) {
      this.recentErrMsg = 'No recent order requests!';
    }
    if (this.pastOrder.length == 0) {
      this.pastErrMsg = 'No past order requests!';
    }
   }

calcDate(date1,date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff/day);
    return days
    }

singleUpdateSignupReq(id){
    this.id = id;
    for (let i = 0; i < this.userOrder.length; i++) {
      if (this.id == this.userOrder[i]._id) {
        this.userOrder1 = this.userOrder[i];
      }
    }
  }

  singleUpdateSignupReq1(id) {
    this.id = id;
    for (let i = 0; i < this.userOrder.length; i++) {
      if (this.id == this.userOrder[i]._id) {
        this.userOrder1 = this.userOrder[i];
      }
    }
  }

  updateSignupReq1() {
    this.userOrder1.status = 'Order cancelled';
    this._dealService.editOrderRequest(this.userOrder1, this.id).subscribe(
      res => {
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

oneStar(){
  this.reviewData.starValue = (<HTMLInputElement>document.getElementById("1-star")).value;
    console.log(this.reviewData.starValue);
}

twoStar(){
  this.reviewData.starValue = (<HTMLInputElement>document.getElementById("2-stars")).value;
      console.log(this.reviewData.starValue);
}

threeStar(){
  this.reviewData.starValue = (<HTMLInputElement>document.getElementById("3-stars")).value;
        console.log(this.reviewData.starValue);
}

fourStar(){
  this.reviewData.starValue = (<HTMLInputElement>document.getElementById("4-stars")).value;
          console.log(this.reviewData.starValue);
}

fiveStar(){
  this.reviewData.starValue = (<HTMLInputElement>document.getElementById("5-stars")).value;
            console.log(this.reviewData.starValue);
}

reviewAndRating(){
  this.loadingCtrl.show();
  console.log(this.reviewData);
  console.log(this.reviewData.starValue);
  console.log(this.userOrder1)
  this.reviewData.buyerId = this.userOrder1.buyerId;
  this.reviewData.buyerName = this.userOrder1.buyerName;
  this.reviewData.prdctId =  this.userOrder1.prdctId;
  this.reviewData.sellerId = this.userOrder1.sellerId;
  this.reviewData.sellerName = this.userOrder1.sellerName;
  let curntDte = new Date().getTime();
    this.reviewData.createdAt = curntDte;
  this._dealService.addReview(this.reviewData).subscribe(
    res => {
      console.log(res);
      this.reviewData.reviewRqstId = res._id;
      console.log(this.reviewData.reviewRqstId);
      this.mapWithPost();
      this.mapWithUser();
      this.mytemplateForm.reset();
      this.loadingCtrl.hide();
      document.getElementById('closeCancelOrderModal1').click();
    },
    err => {
      console.log(err);
    }
  );
}

//map with post
mapWithPost(){
  console.log(this.reviewData);

  this._dealService.mapProductReviewinPost(this.reviewData).subscribe(
    res => {
      console.log(res);

    },
    err => {console.log(err);
    }
  );
}

//map with User
mapWithUser(){
  console.log(this.reviewData);
  this._dealService.mapProductReviewinUser(this.reviewData).subscribe(
    res => {
      console.log(res);
    },
    err => {console.log(err);
    }
  );
}

disputeSave() {
  this.reviewData.disputerId = this.userOrder1.buyerId;
  this.reviewData.disputerName = this.userOrder1.buyerName;
  this.reviewData.prdctId =  this.userOrder1.prdctId;
  this.reviewData.sellerId = this.userOrder1.sellerId;
  this.reviewData.sellerName = this.userOrder1.sellerName;
  this.reviewData.orderRqstId = this.userOrder1._id;
  this.reviewData.dispute = this.userData.dispute;
  this.reviewData.disputeStatus = 'Created';
  this.reviewData.against = 'seller';
  let curntDte = new Date().getTime();
    this.reviewData.createdAt = curntDte;

  this._dealService.addDispute(this.reviewData).subscribe(
    data => {
      console.log(data);
      this.reviewData.disputeId = data._id;
      console.log(this.reviewData.disputeId)
      this.disputeData = data.dispute;
      console.log(this.disputeData);
      this.updatePostDispute();
      this.mytemplateForm.reset();
      document.getElementById('closeCancelOrderModal').click();
    },
    err => {
      console.log(err);
    }
  );
}

updatePostDispute() {
  this._dealService.updatePostBuyerDispute(this.reviewData, this.reviewData.prdctId)
    .subscribe(
      data => {
        console.log(data);
        this.updateUserDispute();
        this.updateUserBuyerDispute();
      },
      err => {
        console.log(err);
      }
    );
}

updateUserDispute() {
  this.reviewData.dispute = this.disputeData;
  this._dealService
    .buyerUpdateUserDispute(this.reviewData, this.reviewData.sellerId)
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
}

updateUserBuyerDispute() {
  this.reviewData.dispute = this.disputeData;
  this._dealService
    .updateBuyerUserDispute(this.reviewData, this.reviewData.disputerId)
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
  var todate = new Date(this.reviewData.createdAt).getDate();
  var tomonth = new Date(this.reviewData.createdAt).getMonth() + 1;
  var toyear = new Date(this.reviewData.createdAt).getFullYear();

  this.disputeMailData = this.reviewData;
  this.disputeMailData.createdAt = tomonth + '/' + todate + '/' + toyear;
  this.disputeMailData.buyerPhone = this.userOrder1.buyerPhone;
  this.disputeMailData.prdctCategory = this.userOrder1.prdctCategory;
  this.disputeMailData.requestId = this.userOrder1.requestId;
  this.disputeMailData.prdctName = this.userOrder1.prdctName;

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

}
