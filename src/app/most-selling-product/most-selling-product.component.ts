import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-most-selling-product',
  templateUrl: './most-selling-product.component.html',
  styleUrls: ['./most-selling-product.component.css']
})
export class MostSellingProductComponent implements OnInit {
  productId: any;
  acntID: any;
  crdDeals = [];
  p: any;
  userDeals = [];
  orderrequests: any = [];
  orderrequestsErr = '';
  splitImage1 = '';
  public trackInformationData: any = {};

  constructor(
    private _dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.orderrequests.length; i++) {
      this.orderrequests.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
    this.loadingCtrl.show();
    document.getElementById('focusDiv').focus();
    this.getUser();
  }

  getUser() {
    this._dealsService.getDeals().subscribe(
      res => {
        this.acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let j = 0;
        let l = 0;
        this.crdDeals = res;
        this.orderrequestsErr = '';
        console.log(this.crdDeals);
        this.getOrderRequests();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'deals';
        this.postTrackInformation();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'deals';
        this.postTrackInformation();
      }
    );
  }

  getOrderRequests() {
    console.log(this.crdDeals);
    let j = 0;
    for (let i = 1; i < this.crdDeals.length; i++) {
      console.log(this.crdDeals[i].orderrequests.length);
      if (this.crdDeals[i].orderrequests.length > 2) {
        this.orderrequests[j] = this.crdDeals[i];
        this.splitImage1 = this.orderrequests[j].image;
        this.orderrequests[j].image = this.splitImage1.split(',', 1);
        j++;
      }
    }
    console.log(this.orderrequests);
    if (this.orderrequests.length == 0) {
      this.orderrequestsErr = 'No products available!';
    }
    this.loadingCtrl.hide();
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
    this._dealsService
      .trackInformationPost(this.trackInformationData)
      .subscribe(data => {
        console.log(data);
      });
  }
}
