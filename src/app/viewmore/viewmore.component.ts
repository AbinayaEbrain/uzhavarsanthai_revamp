import { Component, OnInit, ViewChild } from '@angular/core';
import { DealsService } from '../deals.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
// loader
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.css']
})
export class ViewmoreComponent implements OnInit {
  @ViewChild('queryform') mytemplateForm: NgForm;
  id = '';
  viewmore = [];
  viewPost = [];
  time: any;
  public postProduct: any = {};
  public querydata: any = {};
  city: any;
  state: any;
  userName = '';
  adrsArray: any;
  public previousUrl: any;
  imageArray = '';
  arrayImage = [];
  slideConfig: any;
  getToken: any;
  lastvisit: any;
  reqId: any;
  buyerName: any;
  buyerPhone: any;
  buyerAddress: any;
  buyerCity = {};
  orderRequestMsg: any;
  submitted: any;

  constructor(
    private _dealsService: DealsService,
    private router: Router,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    public loadingCtrl: NgxSpinnerService,
    private location: Location
  ) {
    this.querydata.urgency = '';
  }

  ngOnInit() {
    //this.userName = JSON.parse(localStorage.getItem('currentUser')).firstname;
    console.log(this.querydata.prdctId);
    this.id = this.route.snapshot.params['id'];
    this.loadingCtrl.show();
    this.lastvisit = localStorage.getItem('lastvisitproductid');
    console.log(this.lastvisit);
    if (this.lastvisit) {
      this.openModal();
    }
    this._dealsService.getDeals().subscribe(
      res => {
        this.viewPost = res;
        for (let i = 0; i < this.viewPost.length; i++) {
          if (this.id == this.viewPost[i]._id) {
            this.postProduct.id = this.viewPost[i]._id;
            this.postProduct.category = this.viewPost[i].category;
            this.postProduct.categoryId = this.viewPost[i].categoryId;
            this.postProduct.name = this.viewPost[i].name;
            this.postProduct.quantity = this.viewPost[i].quantity;
            this.postProduct.qnty = this.viewPost[i].qnty;
            this.postProduct.subQuantity = this.viewPost[i].subQuantity;
            this.postProduct.subqnty = this.viewPost[i].subqnty;
            this.postProduct.price = this.viewPost[i].price;
            this.postProduct.description = this.viewPost[i].description;
            this.postProduct.avlPlace = this.viewPost[
              i
            ].avlPlace.formatted_address;
            this.postProduct.accountId = this.viewPost[i].accountId;
            this.imageArray = this.viewPost[i].image;
            this.time = this.viewPost[i].validityTime;
            this.postProduct.firstName = this.viewPost[i].username;
            this.postProduct.lastName = this.viewPost[i].lastname;
            this.postProduct.phone = this.viewPost[i].userNumber;
            this.postProduct.userAddressLine = this.viewPost[i].userAddressLine;
            this.postProduct.address = this.viewPost[i].userAddress;
            console.log(this.postProduct);
            this.loadingCtrl.hide();
          }
        }
        this.postProduct.validityTime = this.datePipe.transform(
          this.time,
          'dd/MM/yyyy'
        );
        this.arrayImage = this.imageArray.split(',');
        // this.slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};
        this.slideConfig = {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: false,
          arrows: false,
          autoplay: false,
          autoplaySpeed: 1500
        };
      },
      err => console.log(err)
    );
  }

  openModal() {
    console.log('1');
    document.getElementById('openmodal').click();
    // $('#myModal').modal('show');
  }
  sendQuery() {
    this.loadingCtrl.show();
    var a = 'UZHAVAN';
    this.reqId = Math.floor(100000 + Math.random() * 900000);
    console.log(this.reqId);
    this.querydata.requestId = a + '-' + this.reqId;
    this.buyerName = JSON.parse(localStorage.getItem('currentUser')).firstname;
    this.buyerPhone = JSON.parse(localStorage.getItem('currentUser')).phone;
    this.buyerAddress = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.addressLine;
    this.buyerCity = JSON.parse(
      localStorage.getItem('currentUser')
    ).address.city.formatted_address;
    this.querydata.buyerName = this.buyerName;
    this.querydata.buyerPhone = this.buyerPhone;
    this.querydata.buyerAddress = this.buyerAddress;
    this.querydata.buyerCity = this.buyerCity;
    this.querydata.buyerId = JSON.parse(localStorage.getItem('currentUser'))._id;
    //seller data
    this.querydata.sellerName = this.postProduct.firstName;
    this.querydata.sellerPhone = this.postProduct.phone;
    this.querydata.sellerAddress = this.postProduct.userAddressLine;
    this.querydata.sellerCity = this.postProduct.address;
    this.querydata.sellerId = this.postProduct.accountId;
    //prduct data
    this.querydata.prdctId = this.postProduct.id;
    this.querydata.prdctCategory = this.postProduct.category;
    this.querydata.prdctCategoryId =  this.postProduct.categoryId;
    this.querydata.prdctName = this.postProduct.name;
    this.querydata.prdctUnit = this.postProduct.qnty;
    this.querydata.prdctQty = this.postProduct.quantity;
    this.querydata.prdctAvlplace = this.postProduct.avlPlace;
    console.log(this.querydata);
    console.log(this.querydata.prdctId);
    this.querydata.status = 'Order created';
    this._dealsService.sendOrderReqmail(this.querydata).subscribe(
      res => {
        console.log(res);
        this.loadingCtrl.hide();
        this.orderRequestMsg =
          'We got your order query, we get back to you soon!';
        this.mytemplateForm.reset();
        setTimeout(() => {
          this.orderRequestMsg = '';
          document.getElementById('closeModal').click();
        }, 5000);
        this.loadingCtrl.hide();
      },
      err => console.log(err)
    );
    this.storeOrderRequest();
    this.smsToSeller();
    this.smsToBuyer();
    localStorage.removeItem('lastvisitproductid');
  }

  //store order request
  storeOrderRequest() {
    
    this._dealsService.storeOrderRequest(this.querydata).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  //sms to seller
  smsToSeller() {
    this._dealsService.sendOrderSmsSeller(this.querydata).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  //sms to buyer
  smsToBuyer() {
    this._dealsService.sendOrderSmsBuyer(this.querydata).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }
  slickInit(e) {
    console.log('slick initialized');
  }

  goToBack() {
    this.location.back();
  }

  checkBuyer() {
    console.log('function works');
    this.getToken = localStorage.getItem('token');
    if (
      this.getToken == null ||
      this.getToken == undefined ||
      this.getToken == ''
    ) {
      console.log('not logged');
      var a = 'wait for login';
      localStorage.setItem('authorization', JSON.stringify(a));
      localStorage.setItem('lastvisitproductid', this.id);
      this.router.navigate(['/login']);
    } else {
      console.log('logged');
      this.openModal();
    }
  }
}
