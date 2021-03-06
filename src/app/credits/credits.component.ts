import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  totalCredit: any;
  public trackInformationData: any = {};
  id: any;
  p: any;
  errMsg: any;
  credits: any = {};
  creditsArr = [];
  credit = [];
  crntUser: any = {};
  roleStatus: any;
  role: any;
  totalCredits: any;
  singleCredit: any;
  singleCredits: any;

  constructor(
    private _dealsService: DealsService,
    private _auth: AuthService,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {
    for (let i = 1; i <= this.creditsArr.length; i++) {
      this.creditsArr.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.getSingleUser();
  }

  goToBack() {
    this.location.back();
  }

  getSingleUser() {
    this._dealsService.getSingleUser(this.id).subscribe(
      data => {
        console.log(data);
        this.crntUser = data;
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'getSingleUser';
        this.postTrackInformation();
        this.roleStatus = data.roleStatus;
        this.role = data.role;
        if (this.role == 'buyer' || this.roleStatus == 'Deactive') {
          this.loadingCtrl.hide();
        }

        if (this.role == 'seller' && this.roleStatus == 'Active') {
          this.getUser();
        }
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

  getUser() {
    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        for (let i = 0; i < res.length; i++) {
          if (this.id == res[i]._id) {
            console.log(res[i]);
            this.credits = res[i];
            this.totalCredits = res[i].credits;
            this.totalCredit = this.totalCredits.toFixed(2);
            console.log(this.totalCredit);
            this.creditsArr = res[i].creditDetails;
          }
        }
        console.log(this.creditsArr);
        if (
          this.creditsArr.length == 0 ||
          this.creditsArr == [] ||
          this.creditsArr == undefined
        ) {
          console.log(this.creditsArr);
          this.errMsg = 'You have not spent credits yet!';
        } else {
          this.creditsArr = this.creditsArr.reverse();
        }
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'details';
        this.postTrackInformation();
      }
    );
  }

  postTrackInformation() {
    let tracking = this._auth.loggedIn()
    if(tracking){
      let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
      let token = localStorage.getItem('token');
      let UserName = localStorage.getItem('firstname');
      let ipAddress = JSON.parse(localStorage.getItem('privateIP'));
      this.trackInformationData.UserId = acntID;
      this.trackInformationData.jwt = token;
      this.trackInformationData.ipAddress = ipAddress;
      this.trackInformationData.UserName = UserName;
    }else{
      this.trackInformationData.UserId = '';
      this.trackInformationData.jwt = '';
      this.trackInformationData.ipAddress = '';
      this.trackInformationData.UserName = '';
    }
    this.trackInformationData.apiCallingAt = new Date().getTime();
    this._dealsService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }
}
