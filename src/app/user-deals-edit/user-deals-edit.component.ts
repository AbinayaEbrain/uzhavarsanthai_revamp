import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';
import { empty } from 'rxjs';
declare var swal: any;
const URL = 'https://uzhavarsanthai.herokuapp.com/api/upload';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

// interface FileReaderEvent extends Event {
//   target: FileReaderEventTarget;
//   getMessage():string;
// }

interface EventTarget {
  result: any;
}

@Component({
  selector: 'app-user-deals-edit',
  templateUrl: './user-deals-edit.component.html',
  styleUrls: ['./user-deals-edit.component.css']
})
export class UserDealsEditComponent implements OnInit {
  addTotal: number;
  addPriceQty: number;
  addQtyPrice: number;
  minusSellerCredit: number;
  sellerCredit: any;
  credits: any;
  creditDetails = [];
  cumulativecredit: number;
  cumulativeprice: number;
  cumulativequantity: number;
  newprice: any;
  newquantity: any;
  lastprice: any;
  lastquantity: any;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'photo'
  });
  id: any;
  @ViewChild('postform') form;
  dealslists = [];
  time: any;
  public deallistobj: any = {};
  success: any;
  currentuserId: any;
  categoryArr = [];
  showUnit: any;
  submitted: boolean;
  public addrKeys: string[];
  public addr: {
    formatted_address: '';
  };
  public address: any;
  public formatted_address: any;
  url: '';
  dateNrml: any;
  currentImg: any;
  valid: boolean = false;
  Image = [];
  today: Date;
  urls = [];
  imageLength = 0;
  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

  constructor(
    private _dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public zone: NgZone,
    public loadingCtrl: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  onFileChange(event) {
    //Method to set the value of the file to the selected file by the user
    //this.Image = event.target.files[0]; //To get the image selected by the user
    var filesAmount = event.target.files.length;
    if (filesAmount > 0) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.urls.push(event.target.files[i]);
        this.imageLength = this.urls.length;
      }
    }
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this.today = new Date();
    this.InitialCall();
    this.currentuserId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.id = this.route.snapshot.params['id'];

    //edit deals

    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        this.dealslists = res;
        console.log(this.dealslists);
        for (let i = 0; i < this.dealslists.length; i++) {
          if (this.id == this.dealslists[i]._id) {
            this.deallistobj.category = this.dealslists[i].category;
            this.deallistobj.name = this.dealslists[i].name;
            this.deallistobj.quantity = this.dealslists[i].quantity;
            this.deallistobj.qnty = this.dealslists[i].qnty;
            this.deallistobj.subQuantity = this.dealslists[i].subQuantity;
            this.deallistobj.subqnty = this.dealslists[i].subqnty;
            this.deallistobj.price = this.dealslists[i].price;
            this.deallistobj.description = this.dealslists[i].description;
            this.deallistobj.image = this.dealslists[i].image;
            this.address = this.dealslists[i].avlPlace;
            this.time = this.dealslists[i].validityTime;
            this.showUnit = this.dealslists[i].qnty;
          }
        }
        this.lastquantity = this.deallistobj.quantity;
        this.lastprice = this.deallistobj.price;
        this.deallistobj.avlPlace = this.address.formatted_address;
        this.dateNrml = this.datePipe.transform(this.time, 'dd/MM/yyyy');
        this.deallistobj.validityTime = this.dateNrml;
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );

    this._dealsService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
      },

      err => {
        this.categoryArr = [];
      }
    );
  }

  getunits() {
    this.showUnit = this.deallistobj.qnty;
  }

  InitialCall() {
    for (let i = 0; i < this.dealslists.length; i++) {
      if (this.id == this.dealslists[i]._id) {
        this.deallistobj.category = this.dealslists[i].category;
        this.deallistobj.name = this.dealslists[i].name;
        this.deallistobj.quantity = this.dealslists[i].quantity;
        this.deallistobj.qnty = this.dealslists[i].qnty;
        this.deallistobj.subQuantity = this.dealslists[i].subQuantity;
        this.deallistobj.subqnty = this.dealslists[i].subqnty;
        this.deallistobj.price = this.dealslists[i].price;
        this.deallistobj.description = this.dealslists[i].description;
        this.deallistobj.image = this.dealslists[i].image;
        this.deallistobj.avlPlace = this.dealslists[
          i
        ].avlPlace.formatted_address;
        this.time = this.dealslists[i].validityTime;
      }
    }
    this.dateNrml = this.datePipe.transform(this.time, 'dd/MM/yyyy');
    this.deallistobj.validityTime = this.dateNrml;
  }

  postImage() {
    this.loadingCtrl.show();
    //Adding the image to the form data to be sent
    if (this.urls.length != 0 || this.urls != undefined) {
      for (let i = 0; i < this.urls.length; i++) {
        var image = new FormData(); //FormData creation
        image.append('Image', this.urls[i]);
        this._dealsService.sendImage(image).subscribe(res => {
          this.loadingCtrl.hide();
          console.log(res);
          this.Image.push(res);
          this.update();
        });
        break;
      }
    }

    if (this.urls.length == 0 || this.urls == undefined || this.urls == []) {
      this.loadingCtrl.hide();
      this.update();
    }
  }

  update() {
    if (this.Image.length == this.imageLength) {
      this.loadingCtrl.show();
      let curntDte = new Date().toLocaleDateString();
      this.deallistobj.date = curntDte;

      if (this.addr == null || this.addr == undefined) {
        this.deallistobj.avlPlace = this.address;
      } else {
        this.deallistobj.avlPlace = this.addr;
      }

      if (this.dateNrml == this.deallistobj.validityTime) {
        this.deallistobj.validityTime = this.time;
      }

      this.deallistobj.username = JSON.parse(
        localStorage.getItem('currentUser')
      ).firstname;
      this.deallistobj.lastname = JSON.parse(
        localStorage.getItem('currentUser')
      ).lastName;
      this.deallistobj.userNumber = JSON.parse(
        localStorage.getItem('currentUser')
      ).phone;
      this.deallistobj.userAddressLine = JSON.parse(
        localStorage.getItem('currentUser')
      ).address.addressLine;
      this.deallistobj.userAddress = JSON.parse(
        localStorage.getItem('currentUser')
      ).address.city.formatted_address;

      if (this.Image.length != 0) {
        this.deallistobj.image = this.Image;
      }

      this._dealsService.editDeals(this.deallistobj, this.id).subscribe(
        res => {
          console.log(res);
          this.newquantity = res.quantity;
          this.newprice = res.price;        
          this.loadingCtrl.hide();
          this.success = 'Updated successfully!';
          setTimeout(() => {
            this.loadingCtrl.show();
            this.router.navigate(['/products']);
            this.loadingCtrl.hide();
          }, 2000);
          // minus credit
      if(this.lastquantity < this.newquantity){
        this.QuantityCredit();
      }

      if(this.lastprice < this.newprice){
        this.PriceCredit();
      }

      if(this.lastquantity < this.newquantity && this.lastprice < this.newprice){
        this.quantityPriceCredit();
      }

      //add credit

      if(this.lastquantity > this.newquantity){
        this.sellerReduceQuantity();
      }

      if(this.lastprice > this.newprice){
        this.sellerReducePrice();
      }

      if(this.lastquantity > this.newquantity && this.lastprice > this.newprice){
        this.sellerQuantityPrice();
      }
        },
        err => console.log(err)
      );
    } else {
      this.urls.shift();
      this.postImage();
    }
  }

  //Minus credits when edit post
  QuantityCredit(){

    if(this.lastquantity < this.newquantity){
      this.cumulativequantity = this.newquantity - this.lastquantity;
      console.log(this.cumulativequantity);
    } else {
      this.cumulativequantity = this.lastquantity;
    }

    this.cumulativeprice = this.newprice

    // if(this.lastprice < this.newprice){
    //   this.cumulativeprice = this.newprice - this.lastprice;
    //   console.log(this.cumulativeprice);
    // }  else {
    //   this.cumulativeprice = this.lastprice;
    // }

    this.cumulativecredit = ((this.cumulativequantity * this.cumulativeprice) * 1/100);
    console.log(this.cumulativecredit);
    this.getUser();
  }

  PriceCredit(){

    if(this.lastprice < this.newprice){
      this.cumulativeprice = this.newprice - this.lastprice;
      console.log(this.cumulativeprice);
    }  else {
      this.cumulativeprice = this.lastprice;
    }
      this.cumulativequantity = this.lastquantity;

    this.cumulativecredit = ((this.cumulativequantity * this.cumulativeprice) * 1/100);
    console.log(this.cumulativecredit);
    this.getUser();
  }

  quantityPriceCredit(){

    if(this.lastquantity < this.newquantity){
      this.cumulativequantity = this.newquantity - this.lastquantity;
      console.log(this.cumulativequantity);
    } else {
      this.cumulativequantity = this.lastquantity;
    }

    if(this.lastprice < this.newprice){
      this.cumulativeprice = this.newprice - this.lastprice;
      console.log(this.cumulativeprice);
    }  else {
      this.cumulativeprice = this.lastprice;
    }

    this.addQtyPrice = (this.cumulativequantity * this.newprice);
    console.log(this.addQtyPrice);

    this.addPriceQty = (this.cumulativeprice * this.lastquantity);
    console.log(this.addPriceQty);

    this.addTotal = this.addQtyPrice + this.addPriceQty;
    console.log(this.addTotal);

    this.cumulativecredit = ((this.addTotal) * 1/100);
    console.log(this.cumulativecredit);
    this.getUser();
  }

  getUser(){
    this._dealsService.getDetails().subscribe(
      res => {
        console.log(res);
        this.loadingCtrl.hide();
        this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
        for (let i = 0; i < res.length; i++) {
          if (this.id == res[i]._id) {
            this.credits = res[i];
          }
        }
        console.log(this.credits);
        this.sellerCredit = this.credits.credits;
        console.log(this.sellerCredit)
        this.minusSellerCredit = (this.sellerCredit-this.cumulativecredit);
        console.log(this.minusSellerCredit);
      },
      err => {
        console.log(err);
      }
    );
  }

  sellerReduceQuantity(){
    if(this.lastquantity > this.newquantity){
      this.cumulativequantity = this.lastquantity - this.newquantity ;
      console.log(this.cumulativequantity);
    } else {
      this.cumulativequantity = this.lastquantity;
    }
    this.cumulativeprice = this.newprice
    this.cumulativecredit = ((this.cumulativequantity * this.cumulativeprice) * 1/100);
    console.log(this.cumulativecredit);
    this.getUser1();
  }

  sellerReducePrice(){

    if(this.lastprice > this.newprice){
      this.cumulativeprice = this.lastprice - this.newprice;
      console.log(this.cumulativeprice);
    }  else {
      this.cumulativeprice = this.lastprice;
    }
      this.cumulativequantity = this.lastquantity;

    this.cumulativecredit = ((this.cumulativequantity * this.cumulativeprice) * 1/100);
    console.log(this.cumulativecredit);
    this.getUser1();
  }

  sellerQuantityPrice(){

      this.cumulativequantity =  this.newquantity;
      console.log(this.cumulativequantity);

      this.cumulativeprice =  this.newprice;
      console.log(this.cumulativeprice);

    this.cumulativecredit = ((this.cumulativequantity * this.cumulativeprice) * 1/100);
    console.log(this.cumulativecredit);
    this.getUser1();
  }

  getUser1(){
    this._dealsService.getDetails().subscribe(
      res => {
        console.log(res);
        this.loadingCtrl.hide();
        this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
        for (let i = 0; i < res.length; i++) {
          if (this.id == res[i]._id) {
            this.credits = res[i];
            this.creditDetails = res[i].creditDetails
          }
        }
        console.log(this.credits);
        console.log(this.creditDetails);
        for (let i = 0; i < this.creditDetails.length; i++) {
          // if (this.id == res[i]._id) {
          //   this.credits = this.credits[i].creditDetails;
          //   console.log()
          // }
        }
        // this.sellerCredit = this.credits.credits;
        // console.log(this.sellerCredit)
        // this.minusSellerCredit = (this.sellerCredit + this.cumulativecredit);
        // console.log(this.minusSellerCredit);
      },
      err => {
        console.log(err);
      }
    );
  }

  // handleInput(evt)
  // 		{
  // 			var charCode = (evt.which) ? evt.which : evt.keyCode;
  // 			if (charCode != 46 && charCode > 31
  // 			&& (charCode < 48 || charCode > 57))
  // 			return true;
  // 			return false;
  //     }

  onSubmit() {
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.updateValueAndValidity();

    this.InitialCall();
  }
}
