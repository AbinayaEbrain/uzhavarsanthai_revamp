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
  recentErrMsg = '';
  pastErrMsg = '';
  d:any;
  private orderCancelmail = 'https://uzhavarsanthai.herokuapp.com/api/sendordercancelrequest';
  recentOrder = [];
  pastOrder = [];
  count : any;
  rating ="";
  public reviewData: any = {};


  constructor(
    private _dealService: DealsService,
    private http: HttpClient,
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
    for (let i = 0; i < this.userOrder.length; i++) {
      this.loadingCtrl.show();
      let today = new Date()
      let past = new Date(this.userOrder[i].createdAt);
      var a = this.calcDate(today,past)
      console.log(a) 
      if ( a <= 1 ) {
          this.loadingCtrl.show();
        this.recentOrder[j] = this.userOrder[i];
        j++;
          this.loadingCtrl.hide();
      } else {
        this.pastOrder[j] = this.userOrder[i];
        j++;
      }
    }
    console.log(this.recentOrder)
    console.log(this.pastOrder)
    if (this.recentOrder.length == 0) {
      this.recentErrMsg = 'No recent order requests!';
    }
    if (this.pastOrder.length == 0) {
      this.pastErrMsg = 'No order requests!';
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

}
