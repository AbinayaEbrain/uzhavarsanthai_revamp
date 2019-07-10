import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/auth.service';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
declare var sweetAlert: any;
@Component({
  selector: 'app-locationdeals',
  templateUrl: './locationdeals.component.html',
  styleUrls: ['./locationdeals.component.css']
})
export class LocationdealsComponent implements OnInit {
  status: any;
  public showDeals = true;
  crdDeals = [
    {
      avlPlace: {
        lat: '',
        lng: ''
      },
      accountId: '',
      validityTime: ''
    }
  ];
  mapDeals = [];
  activeUsers = [];
  userName = {};
  lat2: any;
  long: any;
  lat1: any;
  long1: any;
  latd: any;
  longd: any;
  noLocationErr: any;
  crdDeals1 = [];
  public userdetails: any = [];
  public trackInformationData: any = {};
  errMsg1: any;
  p: any;
  e: any;
  queryString: any;
  categoryArr: any;
  querydetails: any;
  totalDeals1: any;
  getSearchDeals = [];
  submitted: any;
  getPrdtName = [];
  constructor(
    private _dealsService: DealsService,
    private route: Router,
    public loadingCtrl: NgxSpinnerService,
    private _auth: AuthService
  ) {
    this.userdetails.searchqnty = '';
    this.userdetails.searchCategory = '';
    this.showDeals = true;
  }

  ngOnInit() {
        document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.showDeals = true;
    this._dealsService.getDeals().subscribe(
      res => {
        this.crdDeals = res;
        this.lat2 = localStorage.getItem('googleLat');
        this.long = localStorage.getItem('googleLong');
        this.lat1 = this.lat2 * 1.009;
        this.latd = this.lat2 / 1.002;
        let j = 0;
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            this.crdDeals[i].avlPlace.lat < this.lat1 &&
            this.crdDeals[i].avlPlace.lng > this.latd &&
            this.crdDeals[i].validityTime > CurrentDate
          ) {
            this.mapDeals[j] = this.crdDeals[i];
            console.log(this.mapDeals[j]);
            j++;
            this.loadingCtrl.hide();
          }
        }

        // active deals

        this._dealsService.getDetails().subscribe(
          res => {
            this.loadingCtrl.show();
            this.showDeals = true;
            this.activeUsers = res;
            let l = 0;
            let k = 0;
            for (let i = 0; i < this.activeUsers.length; i++) {
              for (let j = 0; j < this.mapDeals.length; j++) {
                if (this.activeUsers[i]._id == this.mapDeals[j].accountId) {
                  if (this.activeUsers[i].status == 'ACTIVE') {
                    this.crdDeals1[k] = this.mapDeals[j];
                    this.getPrdtName[l] = this.crdDeals1[k].name;
                    k++;
                    l++;
                    this.loadingCtrl.hide();
                  }
                }
              }
            }
            this.loadingCtrl.hide();
            if (this.crdDeals1.length == 0) {
              this.loadingCtrl.hide();
              this.noLocationErr = 'No deals availble based on your location';
              document.getElementById('hidePagination').style.display = 'none';
              document.getElementById('hideSearchDiv').style.display = 'none';
              document.getElementById('hideFilterButton').style.display =
                'none';
              this.loadingCtrl.hide();
            }
            this.showDeals = true;
            this.trackInformationData.response = 'Success';
            this.trackInformationData.apiName = 'details';
            this.postTrackInformation();
          },
          err => {
            console.log(err);
            this.trackInformationData.response = 'Failure';
            this.trackInformationData.error = err.statusText;
            this.trackInformationData.apiName = 'details';
            this.postTrackInformation();
          }
        );
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

  case() {
    // console.log(this.queryString);
    this.queryString = this.queryString.toLowerCase();
    for (let i = 0; i < this.getPrdtName.length; i++) {
      if (this.queryString != this.getPrdtName[i]) {
        console.log('no data');
        this.errMsg1 = 'Product Unavailable';
      }
    }
  }

  getCategory() {
    this.loadingCtrl.show();
    this._dealsService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
        this.loadingCtrl.hide();
        this.trackInformationData.response = 'Success';
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
      },
      err => {
        this.loadingCtrl.hide();
        this.categoryArr = [];
        this.trackInformationData.response = 'Failure';
        this.trackInformationData.error = err.statusText;
        this.trackInformationData.apiName = 'category';
        this.postTrackInformation();
      }
    );
  }

  filterDeal() {
    this.loadingCtrl.show();
    this.totalDeals1 = [];
    this.getSearchDeals = this.crdDeals1;
    this.querydetails = this.userdetails;
    this.refreshGrid();
    this.loadingCtrl.hide();
  }

  refreshGrid() {
    this.loadingCtrl.show();
    let j = 0;
    for (let i = 0; i < this.getSearchDeals.length; i++) {
      if (
        this.querydetails.searchCategory == this.getSearchDeals[i].categoryId ||
        this.querydetails.searchmainquantity <=
          this.getSearchDeals[i].quantity ||
        this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||
        this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||
        (this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) ||
          this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price))
      ) {
        this.totalDeals1[j] = this.getSearchDeals[i];
        j++;
      }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      this.loadingCtrl.show();
      sweetAlert('Sorry!', 'Currently no product available', 'error');
      this.showDeals = true;
    }
    this.loadingCtrl.hide();
    this.clear();
  }

  clear() {
    this.querydetails = [];
    this.userdetails = [];
    this.userdetails.searchqnty = '';
    this.userdetails.searchCategory = '';
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
