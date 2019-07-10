declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dealscategory',
  templateUrl: './dealscategory.component.html',
  styleUrls: ['./dealscategory.component.css']
})
export class DealscategoryComponent implements OnInit {
  // categoryArr=[{
  //   image:''
  // }];
  categoryArr: any = [];
  errMsg: any;
  //imageSrc = require('../../../server/uploads/photo-1544505995155.jpg');
  imageSrc: any;
  e: any;
  ProductCountArr: any = [];
  public trackInformationData: any = {};
  count: any;

  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService,
    private _auth:AuthService
  ) {
    for (let i = 1; i <= this.categoryArr.length; i++) {
      this.categoryArr.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.getProductCount();
  }

  getProductCount() {
    if(this._auth.checkOS()){
      this._dealService.getCategoryPrductCount().subscribe(
        data => {
          this.ProductCountArr = data;
          console.log(this.ProductCountArr);
          this.getCategory();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'categoryProductCount';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'categoryProductCount';
          this.postTrackInformation();
        }
      );
    }else{
      this._dealService.getCategoryPrductCount().subscribe(
        data => {
          this.ProductCountArr = data;
          console.log(this.ProductCountArr);
          this.getCategory();
          this.trackInformationData.response = 'Success';
          this.trackInformationData.apiName = 'categoryProductCount';
          this.postTrackInformation();
        },
        err => {
          console.log(err);
          this.trackInformationData.response = 'Failure';
          this.trackInformationData.error = err.statusText;
          this.trackInformationData.apiName = 'categoryProductCount';
          this.postTrackInformation();
        }
      );
    }
  }

  getCategory() {
    this._dealService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
        console.log(this.categoryArr);
        for (let i = 0; i < this.categoryArr.length; i++) {
          for (let j = 0; j < this.ProductCountArr.length; j++) {
            if (this.categoryArr[i]._id == this.ProductCountArr[j]._id) {
              this.categoryArr[i].productcount = this.ProductCountArr[
                j
              ].productcount;
              // alert(this.categoryArr[i].productcount);
            }
          }
        }
        console.log(this.categoryArr);
        this.loadingCtrl.hide();
        if (this.categoryArr.length == 0) {
          this.errMsg = 'No category added';
        }
        // this.imageSrc = require('../../../server/uploads' + this.categoryArr);
        // this.imageSrc = JSON.parse(localStorage.getItem('image_c'))
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
      },
      err => {
        this.loadingCtrl.hide();
        // this.categoryArr = [];
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'category';
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
    this._dealService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }

}
