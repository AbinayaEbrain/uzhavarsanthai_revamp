import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tracking-information',
  templateUrl: './tracking-information.component.html',
  styleUrls: ['./tracking-information.component.css']
})
export class TrackingInformationComponent implements OnInit {
  trackInformationArr: any = [];
  queryString: any;
  errMsg2: string;
  trackerUserName: any = [];
  trackInformationResult: any = [];
  trackInformationArr1: any = [];
  fromDate: any;
  toDate: any;
  errorMsg2: string;

  constructor(
    private _dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getTrackingInformation();
  }

  getTrackingInformation() {
    let j = 0;
    this._dealsService.getTrackInformation().subscribe(
      res => {
        console.log(res);
        this.trackInformationArr = res;
        this.errorMsg2 = '';
        console.log(this.trackInformationArr);
        for (let i = 0; i < this.trackInformationArr.length; i++) {
          this.trackInformationArr[i].UserName = this.trackInformationArr[
            i
          ].UserName.replace(/"([^"]+(?="))"/g, '$1');
          console.log(this.trackInformationArr[i].UserName);
          this.trackerUserName[j] = this.trackInformationArr[i].UserName;
          j++;
        }
        console.log(this.trackerUserName);
      },
      err => {
        console.log(err);
      }
    );
  }

  getTrackingInformation1() {
    this._dealsService.getTrackInformation().subscribe(
      data => {
        this.trackInformationArr1 = data;
        console.log(this.trackInformationArr1);
        this.errorMsg2 = '';
      },
      err => {
        console.log(err);
      }
    );
  }

  case() {
    //  console.log(this.queryString);
    this.queryString = this.queryString.toLowerCase();
    for (let i = 0; i < this.trackerUserName.length; i++) {
      if (this.queryString != this.trackerUserName[i]) {
        this.errMsg2 = 'Product Unavailable';
      } else {
        this.errMsg2 = '';
      }
    }
  }

  filterFromDate(event: any) {
    this.loadingCtrl.show();
    let filfrmdate = event.target.value;
    let utcDate = new Date(filfrmdate);
    this.fromDate = utcDate.getTime();
    console.log(this.fromDate);
    this.loadingCtrl.hide();
    this.getTrackingInformation1();
  }

  filterToDate(event: any) {
    this.loadingCtrl.show();
    let filtodate = event.target.value;
    let utcDate = new Date(filtodate);
    this.toDate = utcDate.getTime();
    console.log(this.toDate);
    this.loadingCtrl.hide();
    this.getTrackingInformation1();
  }

  dateFilterBtn() {
    this.loadingCtrl.show();
    this.trackInformationResult = [];
    let j = 0;
    // this.trackInformationArr = this.trackInformationArr1;
    for (let i = 0; i < this.trackInformationArr.length; i++) {
      this.loadingCtrl.show();
      let date = new Date(this.trackInformationArr[i].apiCallingAt);
      let time = date.getTime();
      console.log(time);
      if (this.fromDate <= time && this.toDate >= time) {
        this.loadingCtrl.show();
        this.trackInformationResult[j] = this.trackInformationArr[i];
        j++;
        this.loadingCtrl.hide();
      }
    }
    console.log(this.trackInformationResult);
    this.trackInformationArr = this.trackInformationResult;
    this.loadingCtrl.hide();
    if (this.trackInformationResult.length == 0) {
      this.loadingCtrl.show();
      this.errorMsg2 = 'Product Unavailable';
      this.loadingCtrl.hide();
    }
  }

  dateResetBtn() {
    this.getTrackingInformation();
  }
}
