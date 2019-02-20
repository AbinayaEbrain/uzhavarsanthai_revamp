import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
      accountId: ''
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
  errMsg1: any;
  p: any;
  e: any;
  queryString: any;
  categoryArr: any;
  querydetails: any;
  totalDeals1: any;
  getSearchDeals = [];
  submitted: any;

  constructor(
    private _dealsService: DealsService,
    private route: Router,
    public loadingCtrl: NgxSpinnerService
  ) {
    this.userdetails.searchqnty = '';
    this.userdetails.searchCategory = '';
    this.showDeals = true;
  }

  ngOnInit() {
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
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            this.crdDeals[i].avlPlace.lat < this.lat1 &&
            this.crdDeals[i].avlPlace.lng > this.latd
          ) {
            this.mapDeals[j] = this.crdDeals[i];
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
            let k = 0;

            for (let i = 0; i < this.activeUsers.length; i++) {
              for (let j = 0; j < this.mapDeals.length; j++) {
                if (this.activeUsers[i]._id == this.mapDeals[j].accountId) {
                  if (this.activeUsers[i].status == 'ACTIVE') {
                    this.crdDeals1[k] = this.mapDeals[j];
                    k++;
                    this.loadingCtrl.hide();
                  }
                }
              }
            }
            if (this.mapDeals.length == 0) {
              this.loadingCtrl.show();
              this.noLocationErr = 'No deals availble based on your location';
              document.getElementById('hidePagination').style.display = 'none';
              document.getElementById('hideSearchDiv').style.display = 'none';
              document.getElementById('hideFilterButton').style.display =
                'none';
              this.loadingCtrl.hide();
            }
            this.showDeals = true;
          },
          err => {}
        );
      },

      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

  case() {
    // console.log(this.queryString);
    this.queryString = this.queryString.toLowerCase();
    // console.log(this.queryString);
  }
  
  getCategory() {
    this.loadingCtrl.show();
    this._dealsService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
        this.loadingCtrl.hide();
      },
      err => {
        this.loadingCtrl.hide();
        this.categoryArr = [];
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
}
