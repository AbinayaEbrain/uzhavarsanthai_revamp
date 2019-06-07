import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var swal: any;

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
  userOrderReq = [];
  userOrder : any = {};
  passingId : any;
  singleImg :any;
  splitImage1 = '';
  userReview: any = {};
  public reviewData: any = {};
  submitted:any

  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router ,
    ) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.passingId = this.route.snapshot.params['id'];
    this.totalOrders();
  }

  totalOrders(){
    this._dealService.getOrderRequest().subscribe(res =>{
    console.log(res);
    this.userOrderReq = res;
    this.loadingCtrl.hide();
    let j =0;
    for (let i = 0; i < this.userOrderReq.length; i++) {
      if (
        this.passingId == this.userOrderReq[i]._id
      ) {
        this.userOrder = this.userOrderReq[i];
         var str = this.userOrder.image;
         var res = str.split(",",1);
         console.log(res)
         this.singleImg = res;
        // this.singleImg[j].image = this.splitImage1.split(",",1);
        // console.log(this.singleImg[j].image)
        j++;
      }
    }
    },err =>{
      console.log(err);
    });
  }


  goToBack() {
    this.location.back();
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
    console.log(this.reviewData.review);
    console.log(this.userOrder);
    this.reviewData.buyerId = this.userOrder.buyerId;
    this.reviewData.buyerName = this.userOrder.buyerName;
    this.reviewData.prdctId = this.userOrder.prdctId;
    this.reviewData.sellerId = this.userOrder.sellerId;
    this.reviewData.sellerName = this.userOrder.sellerName;
    console.log(this.reviewData);
    let curntDte = new Date().getTime();
    this.reviewData.createdAt = curntDte;
    this._dealService.addReview(this.reviewData).subscribe(
      res => {
        console.log(res);
        this.reviewData.reviewRqstId = res._id;
        console.log(this.reviewData.reviewRqstId);
        this.mapWithPost();
        this.mapWithUser();
        //this.mytemplateForm.reset();
        this.loadingCtrl.hide();
        document.getElementById('closeCancelOrderModal1').click();
        document.getElementById("openConfirmModal").click();
        // swal("Sent successfully!", "Your Rate & Review has been sent succesfully!", "success")
        // swal({
        //   title: 'Rate & Review sent successfully!',
        //   text:
        //     'Your Rate & Review has been sent succesfully!',
        //   imageUrl: '../../assets/Images/progress.gif'
        // });
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

  clear(){
          this.mytemplateForm.reset();
  }

}
