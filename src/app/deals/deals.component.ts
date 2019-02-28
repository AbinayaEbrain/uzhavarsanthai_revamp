import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var sweetAlert: any;
declare var $: any;
// loader

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  //for location
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
  isTracking = false;
  status: any;
  categoryArr: any;
  public userdetails: any = [];
  public crdDeals: any = [];
  public totalDeals1: any = [];
  public showDeals = true;
  mapDeals = [];
  activeUsers = [];
  userName = {};
  errMsg = '';
  errMsg1: any;
  lat: any;
  long: any;
  lat1: any;
  long1: any;
  latd: any;
  longd: any;
  crdDeals1 = [];
  queryString: any;
  p: any;
  e: any;
  getlat: any;
  getlng: any;
  getSearchDeals = [];
  querydetails: any;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
    locality: '';
  };
  submitted: any;
  panTo: any;
  getPrdtName = [];
  showErr = true;

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }
  constructor(
    private _dealsService: DealsService,
    private route: Router,
    public loadingCtrl: NgxSpinnerService,
    public zone: NgZone
  ) {
    this.userdetails.searchqnty = '';
    this.userdetails.searchCategory = '';
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this._dealsService.getDeals().subscribe(
      res => {
        this.showDeals = true;
        this.crdDeals = res;
        let CurrentDate = new Date().toISOString();
        let j = 0, k =0;
        for(let i=0;i < this.crdDeals.length ; i++){
          if(this.crdDeals[i].status == 'ACTIVE'){
            if(this.crdDeals[i].validityTime > CurrentDate){
              this.crdDeals1[j] = this.crdDeals[i];
              this.getPrdtName[k] = this.crdDeals1[j].name;
              j++;
              k++;
            }
          }
        }
        if (this.crdDeals1.length == 0) {
          this.errMsg = 'Currently no deals available';
          document.getElementById('hidePagination').style.display = 'none';
          document.getElementById('hideSearchDiv').style.display = 'none';
          document.getElementById('hideFilterButton').style.display = 'none';
          document.getElementById('hideNearByBtn').style.display = 'none';
          document.getElementById('showBackButton').style.display = 'block';
        }
        this.showDeals = true;
        this.loadingCtrl.hide();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );

    // this._dealsService.getDetails().subscribe(
    //   res => {
    //     this.showDeals = true;
    //     this.activeUsers = res;
    //     let l = 0;
    //     let k = 0;
    //     let CurrentDate = new Date().toISOString();
    //     for (let i = 0; i < this.activeUsers.length; i++) {
    //       for (let j = 0; j < this.crdDeals.length; j++) {
    //         if (
    //           this.activeUsers[i]._id == this.crdDeals[j].accountId &&
    //           this.crdDeals[j].validityTime > CurrentDate
    //         ) {
    //           if (this.activeUsers[i].status == 'ACTIVE') {
    //             this.crdDeals1[k] = this.crdDeals[j];
    //             this.getPrdtName[l] = this.crdDeals1[k].name;
    //             k++;
    //             l++;
    //           }
    //         }
    //       }
    //     }
    //     console.log(this.getPrdtName);
    //     this.showDeals = true;
    //     this.loadingCtrl.hide();
    //   },
    //   err => {}
    // );
  }

  case() {
    this.queryString = this.queryString.toLowerCase();
    for (let i = 0; i < this.getPrdtName.length; i++) {
      if (this.queryString != this.getPrdtName[i]) {
        console.log('no data');
        this.errMsg1 = 'Product Unavailable';
      }
    }
  }

  getCategory() {
    var pacContainerInitialized = false;
    $('#searchLocation').keypress(function() {
      if (!pacContainerInitialized) {
        $('.pac-container').css('z-index', '9999');
        pacContainerInitialized = true;
      }
    });
    this._dealsService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
        this.loadingCtrl.hide();
      },

      err => {
        this.categoryArr = [];
      }
    );
  }

  filterDeal() {
    this.loadingCtrl.show();
    this.totalDeals1 = [];
    this.getSearchDeals = this.crdDeals;
    this.querydetails = this.userdetails;
    this.refreshGrid();
    this.loadingCtrl.hide();
  }

  refreshGrid() {
    this.loadingCtrl.show();
    if (this.addr != null || this.addr != undefined) {
      this.querydetails.searchLocation = this.addr.locality;
    }
    let CurrentDate = new Date().toISOString();
    let j = 0;
    for (let i = 0; i < this.getSearchDeals.length; i++) {
      if (this.getSearchDeals[i].validityTime > CurrentDate)
        if (
          this.querydetails.searchCategory ==
            this.getSearchDeals[i].categoryId ||
          this.querydetails.searchmainquantity <=
            this.getSearchDeals[i].quantity ||
          this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||
          (this.querydetails.frmAmt <=
            parseFloat(this.getSearchDeals[i].price) ||
            this.querydetails.toCost >=
              parseFloat(this.getSearchDeals[i].price)) ||
          this.querydetails.searchLocation ==
            this.getSearchDeals[i].avlPlace.locality
        ) {
          this.totalDeals1[j] = this.getSearchDeals[i];
          j++;
        }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';
    this.clear();

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
    if (this.addr != undefined) {
      this.addr.locality = '';
    }
  }
}
