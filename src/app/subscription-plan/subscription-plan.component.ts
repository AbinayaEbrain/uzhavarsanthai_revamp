import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {
  subscriptionArr: any = [];
  subcriptionData: any = {};
  errMsg: any;
  successMsg: any;
  id: any;
  userId: any;
  subcriptionId: any;
  usersCurrentCredits: any;
  currentCredits: any;
  crntSUbscription: any;
  crntUser: any = {};
  roleStatus: any;
  role: any;
  public trackInformationData: any = {};

  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {}

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.userId);
    this.getSingleUser();
  }

  goToBack() {
    this.location.back();
  }

  getSingleUser() {
    this._dealService.getSingleUser(this.userId).subscribe(
      data => {
        console.log(data);
        this.crntUser = data;
        this.roleStatus = data.roleStatus;
        this.role = data.role;
        if (this.role == 'buyer' || this.roleStatus == 'Deactive') {
          this.loadingCtrl.hide();
        }

        if (this.role == 'seller' && this.roleStatus == 'Active') {
          this.getSubscription();
          this.currentUserCredit();
        }
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

  getSubscription() {
    this.loadingCtrl.show();
    this._dealService.getSubscription().subscribe(
      res => {
        console.log(res);
        this.subscriptionArr = res;
        this.loadingCtrl.hide();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getSubscription';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'getSubscription';
        this.postTrackInformation();
      }
    );
  }

  currentUserCredit() {
    this.loadingCtrl.show();
    this._dealService.getCurrentCredit(this.userId).subscribe(
      res => {
        console.log(res);
        this.crntSUbscription = res.subscriptionName;
        this.usersCurrentCredits = res.credits;
        this.loadingCtrl.hide();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'currentUserCredits';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.loadingCtrl.hide();
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'currentUserCredits';
        this.postTrackInformation();
      }
    );
  }

  getSingleSubsc(id) {
    this.loadingCtrl.show();
    this.id = id;
    console.log(this.id);
    this._dealService.getSingleSubscription(id).subscribe(
      data => {
        console.log(data);
        this.subcriptionId = data._id;
        this.subcriptionData = data;
        this.loadingCtrl.hide();
        // this.updateSubsc();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getSingleSubscription';
        this.postTrackInformation();
      },
      err => {
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'getSingleSubscription';
        this.postTrackInformation();
      }
    );
  }

  updateSubsc() {
    this.loadingCtrl.show();
    this.subcriptionData.currentCredits = this.usersCurrentCredits;
    this._dealService
      .updateUserSubscription(this.subcriptionData, this.userId)
      .subscribe(
        data => {
          console.log(data);
          this.loadingCtrl.hide();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'updateUserSubscription';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'updateUserSubscription';
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
