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
  p: any;
  e: any;
  errMsg1: any;
  submitted: any;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
    locality: '';
  };
  getCategory: any;
  getPrdtName = [];

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
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
    this.userdetails.searchqnty = '';
    this.showDeals = true;
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this.showDeals = true;
    this._dealService.getDeals().subscribe(
      res => {
        let j = 0;
        this.crdDeals = res;
        console.log(this.crdDeals);
        this.showDeals = true;
        this.id = this.route.snapshot.params['id'];
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            this.id == this.crdDeals[i].categoryId &&
            this.crdDeals[i].validityTime > CurrentDate &&
            this.crdDeals[i].status == 'ACTIVE'
          ) {
            console.log(this.crdDeals[i].validityTime);
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
        this.querydetails.searchqnty == this.getSearchDeals[i].qnty ||
        this.querydetails.frmAmt <= parseFloat(this.getSearchDeals[i].price) ||
        this.querydetails.toCost >= parseFloat(this.getSearchDeals[i].price) ||
        this.querydetails.searchLocation ==
          this.getSearchDeals[i].avlPlace.locality
      ) {
        this.totalDeals1[j] = this.getSearchDeals[i];
        j++;
      }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      sweetAlert('Sorry!', 'Currently no product available', 'error');
      this.showDeals = true;
    }
    this.loadingCtrl.hide();
    this.clear();
  }

  goToView(id) {
    this.router.navigate(['/viewmore', id], this.id);
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

  getLocation() {
    this.totalDeals1 = [];
    let j = 0;
    for (let i = 0; i < this.totalDeals.length; i++) {
      if (this.addr.locality == this.totalDeals[i].avlPlace.locality) {
        this.totalDeals1[j] = this.totalDeals[i];
        j++;
      }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      sweetAlert('Sorry!', 'Currently no product available', 'error');
      this.showDeals = true;
    }
    this.getLocationDeals = '';
  }

  clickMe() {
    this.totalDeals1 = [];
    let j = 0;
    for (let i = 0; i < this.totalDeals.length; i++) {
      if (this.addr.locality == this.totalDeals[i].avlPlace.locality) {
        this.totalDeals1[j] = this.totalDeals[i];
        j++;
      }
    }
    this.showDeals = false;
    document.getElementById('hidePagination').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      sweetAlert('Sorry!', 'Currently no product available', 'error');
      this.showDeals = true;
    }
    this.getLocationDeals = '';
  }
}
