import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @ViewChild('reviewform') mytemplateForm: NgForm;
  orderRequests: any = [];
  createdRequests: any = [];
  id: any;
  acntID: any;
  userReview: any = {};
  public reviewData: any = {};

  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.acntID);
    this.getSignUpRqst();
  }

  goToBack() {
    this.location.back();
  }
  // getSingleUser(){
  //   this._dealService.getSingleUser(this.acntID).subscribe(data =>{
  //     console.log(data);
  //     this.crntUser = data;
  //     this.roleStatus = data.roleStatus;
  //     this.role = data.role;
  //     if(this.role == "buyer" || this.roleStatus =="Deactive"){
  //       this.loadingCtrl.hide();
  //     }

  //     if(this.role == "seller" && this.roleStatus =="Active"){
  //       this.getSignUpRqst();
  //     }
  //   },err =>{
  //     console.log(err);
  //   })

  // }

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
      // this.errMsg = 'No order requests!';
    }
    console.log(this.createdRequests);
    this.loadingCtrl.hide();
  }

  singleUpdateSignupReq(id) {
    this.id = id;
    for (let i = 0; i < this.createdRequests.length; i++) {
      if (this.id == this.createdRequests[i]._id) {
        this.userReview = this.createdRequests[i];
      }
    }
  }

  oneStar() {
    this.reviewData.starValue = (<HTMLInputElement>(
      document.getElementById('1-star')
    )).value;
    console.log(this.reviewData.starValue);
  }

  twoStar() {
    this.reviewData.starValue = (<HTMLInputElement>(
      document.getElementById('2-stars')
    )).value;
    console.log(this.reviewData.starValue);
  }

  threeStar() {
    this.reviewData.starValue = (<HTMLInputElement>(
      document.getElementById('3-stars')
    )).value;
    console.log(this.reviewData.starValue);
  }

  fourStar() {
    this.reviewData.starValue = (<HTMLInputElement>(
      document.getElementById('4-stars')
    )).value;
    console.log(this.reviewData.starValue);
  }

  fiveStar() {
    this.reviewData.starValue = (<HTMLInputElement>(
      document.getElementById('5-stars')
    )).value;
    console.log(this.reviewData.starValue);
  }

  reviewAndRating() {
    this.loadingCtrl.show();
    console.log(this.reviewData);
    console.log(this.reviewData.starValue);
    console.log(this.userReview);
    this.reviewData.buyerId = this.userReview.buyerId;
    this.reviewData.buyerName = this.userReview.buyerName;
    this.reviewData.prdctId = this.userReview.prdctId;
    this.reviewData.sellerId = this.userReview.sellerId;
    this.reviewData.sellerName = this.userReview.sellerName;
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
  mapWithPost() {
    console.log(this.reviewData);

    this._dealService.mapProductReviewinPost(this.reviewData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  //map with User
  mapWithUser() {
    console.log(this.reviewData);
    this._dealService.mapProductReviewinUser(this.reviewData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
