import { Component, OnInit, ViewChild, NgZone, HostListener } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare let ClientIP: any;
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
  splitImage1 = '';
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
  p: number = 1;
  e: number = 1;
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
  privateIP:any;
  getPrdtName = [];
  showErr = true;
  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      console.log(this.addr.locality)
      this.getLocation();
      this.addrKeys = Object.keys(addrObj);
    });
  }
  getLocationDeals: any;
  constructor(
    private _dealsService: DealsService,
    private route: Router,
    public loadingCtrl: NgxSpinnerService,
    public zone: NgZone
  ) {
    this.privateIP = ClientIP;
    console.log(this.privateIP)
    this.userdetails.searchqnty = '';
    this.userdetails.searchCategory = '';
    for (let i = 1; i <= this.crdDeals1.length; i++) {
      this.crdDeals1.push(`deal ${i}.0`);
    }
      for (let i = 1; i <= this.totalDeals1.length; i++){
        this.totalDeals1.push(`deal ${i}`)
    }
  }

  ngOnInit() {
      document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this._dealsService.getDeals().subscribe(
      res => {
        this.showDeals = true;
        this.crdDeals = res;
        console.log(this.crdDeals )
        let CurrentDate = new Date().toISOString();
        let j = 0, k =0;
        for(let i=0;i < this.crdDeals.length ; i++){
          if(this.crdDeals[i].status == 'ACTIVE'){
            if(this.crdDeals[i].validityTime > CurrentDate && this.crdDeals[i].quantity != 0){
              this.crdDeals1[j] = this.crdDeals[i];
              this.splitImage1 =  this.crdDeals1[j].image;
              this.crdDeals1[j].image = this.splitImage1.split(",",1);
              this.getPrdtName[k] = this.crdDeals1[j].name;
              j++;
              k++;
            }
          }
        }
        if (this.crdDeals1.length == 0) {
          this.errMsg = 'Currently no deals available';
          this.loadingCtrl.hide();
          document.getElementById('hidePagination').style.display = 'none';
          document.getElementById('hideSearchDiv').style.display = 'none';
          document.getElementById('hideFilterButton').style.display = 'none';
          document.getElementById('hideSearchDiv1').style.display = 'none';
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
      if (this.getSearchDeals[i].validityTime > CurrentDate && this.getSearchDeals[i].quantity != 0)
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

  getLocation() {
    this.totalDeals1 = []
 let j = 0;
     for (let i = 0; i < this.crdDeals1.length; i++) {
       console.log(this.addr.locality)
       if (this.addr.locality == this.crdDeals1[i].avlPlace.locality) {
         this.totalDeals1[j] = this.crdDeals1[i];
         j++;
       }
     }
     this.showDeals = false;
     document.getElementById('hidePagination').style.display = 'block';

     if (this.totalDeals1.length == 0) {
       sweetAlert('Sorry!', 'Currently no product available', 'error');
       this.getLocationDeals = '';
       this.showDeals = true;
     }
     this.getLocationDeals = '';
   }

   goToView(data) {
    let ip = JSON.parse(localStorage.getItem('privateIP'));
    if(ip){
      this.privateIP = ip;
    }
    console.log(this.privateIP);
    this._dealsService.getCount(data.name,data._id,this.privateIP).subscribe(res =>{
      console.log(res);
      this.route.navigate(['/viewmore', data._id]);
    },err =>{
      console.log(err);
    });
  }
  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
}
