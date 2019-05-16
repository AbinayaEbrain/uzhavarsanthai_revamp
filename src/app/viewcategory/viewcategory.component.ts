import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  NgZone,
  HostListener
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
  crdCategory = [];
  totalDeals = [];
  singleMultiArray  =[];
  id: any;
  errMsg: any;
  noSearchDeals: any;
  public userdetails: any = [];
  specifyCategory = [];
  getSearchDeals = [];
  multiPosts = [];
  multiPost : any;
  splitImage1 = '';
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
  splitImage: '';
  loggedUser:any;
  multiImage = [];
  bulkPost : boolean = false;

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
    this.userdetails.searchqnty = '';
    this.querydetails.searchLocation = '';
    this.showDeals = true;
    for (let i = 1; i <= this.singleMultiArray.length; i++) {
      this.singleMultiArray.push(`deal ${i}`);
    }
    for (let i = 1; i <= this.totalDeals1.length; i++) {
      this.totalDeals1.push(`deal ${i}`);
    }
  }

  ngOnInit() {
    this.loadingCtrl.show();
    if (localStorage.getItem('currentUser')){
        this.loggedUser = JSON.parse(localStorage.getItem('currentUser'))._id;
        this._dealService.getDeals().subscribe(
          res => {
            let j = 0;
            this.crdDeals = res;
            console.log(this.crdDeals)
            this.showDeals = true;
            this.id = this.route.snapshot.params['id'];
            let CurrentDate = new Date().toISOString();
            for (let i = 0; i < this.crdDeals.length; i++) {
              if (this.id == this.crdDeals[i].categoryId  && this.loggedUser != this.crdDeals[i].accountId && this.crdDeals[i].validityTime > CurrentDate && this.loggedUser != this.crdDeals[i].accountId && this.crdDeals[i].status == 'ACTIVE' ) {
                console.log(this.crdDeals[i].accountId)
                this.totalDeals[j] = this.crdDeals[i];
                this.splitImage =  this.totalDeals[j].image;
                if(this.splitImage != undefined || this.splitImage != null || this.splitImage != ''){
                  this.totalDeals[j].image = this.splitImage.split(",",1);
                }
                this.getPrdtName = this.totalDeals[j].name;
                j++;
                this.loadingCtrl.hide();
              }
            }
            this.getMultiArray();

            if (this.totalDeals.length == 0) {
              this.loadingCtrl.show();
              this.errMsg = 'Currently no deals available';
              document.getElementById('hidePagination').style.display = 'none';
              document.getElementById('hideSearchDiv').style.display = 'none';
              document.getElementById('hideSelectedCategory').style.display ='none';
              document.getElementById('hideFilterButton').style.display = 'none';
              document.getElementById('hideSearchlocDiv').style.display = 'none';
              document.getElementById('hideFilterButton2').style.display = 'none';

              this.loadingCtrl.hide();
            }

            this.showDeals = true;
          },
          err => {
            console.log(err);
          }
        );
    }else{
      this._dealService.getDeals().subscribe(
        res => {
          let j = 0;
          this.crdDeals = res;
          console.log(this.crdDeals)
          this.showDeals = true;
          this.id = this.route.snapshot.params['id'];
          let CurrentDate = new Date().toISOString();
          for (let i = 0; i < this.crdDeals.length; i++) {
            if (this.id == this.crdDeals[i].categoryId  && this.crdDeals[i].validityTime > CurrentDate && this.crdDeals[i].status == 'ACTIVE' ) {
              console.log(this.crdDeals[i].accountId)
              this.totalDeals[j] = this.crdDeals[i];
              this.splitImage =  this.totalDeals[j].image;
              if(this.splitImage != undefined || this.splitImage != null || this.splitImage != ''){
                this.totalDeals[j].image = this.splitImage.split(",",1);
              }
              this.getPrdtName = this.totalDeals[j].name;
              j++;
              this.loadingCtrl.hide();
            }
          }
          this.getMultiArray();

          if (this.totalDeals.length == 0) {
            this.loadingCtrl.show();
            this.errMsg = 'Currently no deals available';
            document.getElementById('hidePagination').style.display = 'none';
            document.getElementById('hideSearchDiv').style.display = 'none';
            document.getElementById('hideSelectedCategory').style.display ='none';
            document.getElementById('hideFilterButton').style.display = 'none';
            document.getElementById('hideSearchlocDiv').style.display = 'none';
            document.getElementById('hideFilterButton2').style.display = 'none';

            this.loadingCtrl.hide();
          }

          this.showDeals = true;
        },
        err => {
          console.log(err);
        }
      );
    }
    this.showDeals = true;
    this._dealService.getCategory().subscribe(
      res =>{
        this.crdCategory = res;
        console.log(this.crdCategory);
        this.id = this.route.snapshot.params['id'];
        for (let i=0; i< this.crdCategory.length; i++){
          if (this.crdCategory[i]._id == this.id){
            this.getCategory = this.crdCategory[i].productCategory;
          }
        }
      }
    )
  }

  getMultiArray(){
  if (localStorage.getItem('currentUser')){
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'))._id;
    this._dealService.getMultiPost().subscribe(res =>{
      let j = 0;
      this.multiPost = res;
        let CurrentDate = new Date().toISOString();
      for (let i = 0; i < this.multiPost.length; i++) {
        if (
          this.id == this.multiPost[i].categoryId && this.loggedUser != this.crdDeals[i].accountId &&
          this.multiPost[i].validityTime > CurrentDate &&
          this.multiPost[i].status == 'ACTIVE'
        ) {
          this.multiPosts[j] = this.multiPost[i];
          this.splitImage1 =  this.multiPosts[j].image;
          this.multiPosts[j].image = this.splitImage1.split(",",1);
          j++;
          this.loadingCtrl.hide();
        }
      }
      this.getArray();
    },err =>{
      console.log(err);
    });
  }else {
    this._dealService.getMultiPost().subscribe(res =>{
      let j = 0;
      this.multiPost = res;
        let CurrentDate = new Date().toISOString();
      for (let i = 0; i < this.multiPost.length; i++) {
        if (
          this.id == this.multiPost[i].categoryId &&
          this.multiPost[i].validityTime > CurrentDate &&
          this.multiPost[i].status == 'ACTIVE'
        ) {
          this.multiPosts[j] = this.multiPost[i];
          this.splitImage1 =  this.multiPosts[j].image;
          this.multiPosts[j].image = this.splitImage1.split(",",1);
          j++;
          this.loadingCtrl.hide();
        }
      }
      this.getArray();
    },err =>{
      console.log(err);
    });
  }

  }

  getArray(){
    this.singleMultiArray = this.totalDeals.concat(this.multiPosts);
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
    }else{
      this.querydetails.searchLocation = ''
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
    // document.getElementById('hidePagination1').style.display = 'block';
    document.getElementById('backToAll').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      this.totalDeals1 = [];
      this.errMsgSec = 'location';
      this.showDeals = false;
    }
    this.loadingCtrl.hide();
    this.clear();
  }

  goToView(data) {
    let ip = JSON.parse(localStorage.getItem('privateIP'));
    if (ip) {
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
    //  console.log(this.queryString);
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
      this.reset()
    }
  }

  getLocation() {
    this.totalDeals1 = [];
    // this.queryString = '';
    let j = 0;
    for (let i = 0; i < this.totalDeals.length; i++) {
      if (this.addr.locality != undefined) {
        if (this.addr.locality == this.totalDeals[i].avlPlace.locality) {
          this.totalDeals1[j] = this.totalDeals[i];
          this.errMsg1 = '';
          j++;
        }else if (this.addr.formatted_address == this.totalDeals[i].avlPlace.formatted_address){
          this.totalDeals1[j] = this.totalDeals[i];
          this.errMsg1 = '';
          j++;
        }
      } else {
        if (
          this.addr.formatted_address ==
          this.totalDeals[i].avlPlace.formatted_address
        ) {
          this.totalDeals1[j] = this.totalDeals[i];
          this.errMsg1 = '';
          j++;
        }
      }
    }
    this.showDeals = false;
    // document.getElementById('hidePagination1').style.display = 'block';
    document.getElementById('backToAll').style.display = 'block';

    if (this.totalDeals1.length == 0) {
      // sweetAlert('Sorry!', 'Currently no product available', 'error');
      this.singleMultiArray = [];
      this.errMsg1 = 'location';
      this.errMsgSec = '';
      this.getLocationDeals = '';
      // this.showDeals = true;
    }
    if (this.addr.locality == '') {
      this.errMsg1 = '';
    }
  }

  adrsChange() {
    if (this.getLocationDeals == '') {
      this.showDeals = true;
      this.reset2();
    }
  }

  reset2() {
    this.errMsg1 = '';
    this.addr.locality = '';
    this.getLocationDeals = '';
  }

  reset() {
    this.errMsg1 = '';
    this.errMsgSec = '';
    this.queryString = '';
    this.showDeals = true;
    this.getArray()
    document.getElementById('backToAll').style.display = 'none';
  }

  reset1() {
    this.queryString = '';
    document.getElementById('backToAll').style.display = 'none';
  }

  gotoBck() {
    this.showDeals = true;
    this.getArray()
    this.queryString = '';
    this.errMsg1 = '';
    this.errMsg2 = '';
    this.errMsgSec = '';
    this.getLocationDeals = '';
    document.getElementById('backToAll').style.display = 'none';
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
