import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';
import { ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { GooglePlacesDirective } from '../google-places.directive';
// import {} from '@types/googlemaps';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';

declare var sweetAlert: any;
declare var $: any;
declare let ClientIP: any;

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {
  getLocationDeals: any;
  locationData: any;
  public showDeals = true;
  crdDeals = [];
  totalDeals = [];
  id: any;
  errMsg: any;
  noSearchDeals: any;
  public userdetails: any = [];
  specifyCategory = [];
  getSearchDeals = [];
  querydetails: any = {};
  totalDeals1 = [];
  noSearchDealsErr: any;
  queryString: any;
  p: number = 1;
  e: number = 1;
  errMsg1: any;
  submitted: any;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
    locality: '';
  };
  getCategory: any;
  getPrdtName = [];
  privateIP: any;
  count: number;
  errMsg2: any;
  errMsgSec: any;

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.getLocation();
      this.addrKeys = Object.keys(addrObj);
    });
  }
  constructor(
    private route: ActivatedRoute,
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService,
    private router: Router,
    public zone: NgZone
  ) {
    this.privateIP = ClientIP;
    console.log(this.privateIP);
    this.userdetails.searchqnty = '';
    this.showDeals = true;
    for (let i = 1; i <= this.totalDeals.length; i++) {
      this.totalDeals.push(`deal ${i}.0`);
    }
    for (let i = 1; i <= this.totalDeals.length; i++) {
      this.totalDeals1.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this.showDeals = true;
    this._dealService.getDeals().subscribe(
      res => {
        let j = 0;
        this.crdDeals = res;
        this.showDeals = true;
        this.id = this.route.snapshot.params['id'];
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            this.id == this.crdDeals[i].categoryId &&
            this.crdDeals[i].validityTime > CurrentDate &&
            this.crdDeals[i].status == 'ACTIVE'
          ) {
            this.totalDeals[j] = this.crdDeals[i];
            this.getCategory = this.totalDeals[j].category;
            this.getPrdtName = this.totalDeals[j].name;
            j++;

            this.loadingCtrl.hide();
          }
        }
        if (this.totalDeals.length == 0) {
          this.loadingCtrl.show();
          this.errMsg = 'Currently no deals available';
          document.getElementById('hidePagination').style.display = 'none';
          document.getElementById('hideSearchDiv').style.display = 'none';
          document.getElementById('hideSelectedCategory').style.display =
            'none';
          document.getElementById('hideFilterButton').style.display = 'none';
          this.loadingCtrl.hide();
        }

        this.showDeals = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  getGoogleAddress() {
    var pacContainerInitialized = false;
    $('#searchLocation').keypress(function() {
      if (!pacContainerInitialized) {
        $('.pac-container').css('z-index', '9999');
        pacContainerInitialized = true;
      }
    });
  }

  filterDeal() {
    //  alert('1')
    this.totalDeals1 = [];
    this.loadingCtrl.show();
    this.getSearchDeals = this.totalDeals;
    this.querydetails = this.userdetails;
    this.refreshGrid();
    this.loadingCtrl.hide();
  }

  refreshGrid() {
    if (this.addr != null || this.addr != undefined) {
      this.querydetails.searchLocation = this.addr.locality;
    }
    this.loadingCtrl.show();
    let j = 0;
    for (let i = 0; i < this.getSearchDeals.length; i++) {
      if (
        this.querydetails.searchmainquantity <=
          this.getSearchDeals[i].quantity ||
        this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||
        this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) ||
        this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price) ||
        this.querydetails.searchLocation ==
          this.getSearchDeals[i].avlPlace.locality
      ) {
        this.totalDeals1[j] = this.getSearchDeals[i];
        this.errMsgSec = '';
        j++;
      }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';
    document.getElementById('backToAll').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      this.totalDeals1 = [];
      this.errMsgSec = 'location';
      // this.showDeals = true;
    }
    this.loadingCtrl.hide();
    this.clear();
  }

  goToView(data) {
    let ip = JSON.parse(localStorage.getItem('privateIP'));
    if (ip)
 {
      this.privateIP = ip;
    }
    console.log(this.privateIP);

    this._dealService.getCount(data.name, data._id, this.privateIP).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/viewmore', data._id], this.id);
      },
      err => {
        console.log(err);
      }
    );
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

  case() {
    // console.log(this.queryString);
    this.queryString = this.queryString.toLowerCase();
    for (let i = 0; i < this.getPrdtName.length; i++) {
      if (this.queryString != this.getPrdtName[i]) {
        this.errMsg2 = 'Product Unavailable';
      }
    }

    if (this.queryString != '') {
      document.getElementById('backToAll').style.display = 'block';
    } else if (this.showDeals == false) {
      document.getElementById('backToAll').style.display = 'block';
    } else {
      document.getElementById('backToAll').style.display = 'none';
    }
  }

  getLocation() {
    this.totalDeals1 = [];
    this.queryString = '';
    console.log(this.addr.locality);
    let j = 0;
    for (let i = 0; i < this.totalDeals.length; i++) {
      if(this.addr.locality != undefined){
        if (this.addr.locality == this.totalDeals[i].avlPlace.locality) {
          this.totalDeals1[j] = this.totalDeals[i];
          this.errMsg1 = '';
          j++;
        }
      }else{
        if(this.addr.formatted_address == this.totalDeals[i].avlPlace.formatted_address){
          this.totalDeals1[j] = this.totalDeals[i];
          this.errMsg1 = '';
          j++;
        }
      }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';
    document.getElementById('backToAll').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      // console.log(this.addr.locality);
      // sweetAlert('Sorry!', 'Currently no product available', 'error');
      this.errMsg1 = 'locayion';
      this.errMsgSec = '';
      this.getLocationDeals = '';
      // this.showDeals = true;
    }
    this.getLocationDeals = '';
  }

  reset() {
    this.errMsg1 = '';
    this.errMsgSec = '';
    this.queryString = '';
    this.showDeals = true;
    document.getElementById('backToAll').style.display = 'none';
  }

  reset1() {
    this.queryString = '';
    document.getElementById('backToAll').style.display = 'none';
  }

  gotoBck() {
    this.showDeals = true;
    this.queryString = '';
    this.errMsg1 = '';
    this.errMsg2 = '';
    this.errMsgSec = '';
    document.getElementById('backToAll').style.display = 'none';
  }
}
