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
  prdtCreditId: any;
  addSellerCredit: any;
  totalCredit: any;
  prdtCredit: any;
  credit: any;
  productId: any;
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
  creditsOld: any;
  myCredit: any;
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
    console.log(this.id);
    this.getUserCredits();
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
        console.log(this.lastquantity);
        console.log(this.lastprice);
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

  getUserCredits() {
    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        for (let i = 0; i < res.length; i++) {
          if (this.currentuserId == res[i]._id) {
            this.creditsOld = res[i];
            console.log(this.creditsOld);
          }
        }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
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

    this.newquantity = this.deallistobj.quantity;
    this.newprice = this.deallistobj.price;
        console.log(this.newquantity);
        console.log(this.newprice);
        console.log(this.lastprice);

        // minus credit
        if(this.lastprice == this.newprice){
          if(this.lastquantity < this.newquantity ){
            this.QuantityCredit();
          }
        }

        if(this.lastprice == this.newprice){
          if(this.lastquantity > this.newquantity){
            this.sellerReduceQuantity();
          }
        }
       
        if(this.lastquantity == this.newquantity){
          if(this.lastprice < this.newprice){
            this.PriceCredit();
          }
        }

        if(this.lastquantity == this.newquantity){
          if(this.lastprice > this.newprice){
            this.sellerReducePrice();
          }
        }
  
        if(this.lastquantity < this.newquantity && this.lastprice < this.newprice){
          this.quantityPriceCredit();
        }
  
        //add credit
  
        if(this.lastquantity > this.newquantity && this.lastprice > this.newprice){
          this.sellerQuantityPrice();
        }
    console.log(this.creditsOld)
    this.myCredit = this.creditsOld.credits;
    console.log(this.myCredit);

    if(this.myCredit < this.cumulativecredit){
      console.log('No credit')
      swal({
        title: 'You have no credit!',
        text:
          'If you post your product! Please pay MONEY show your PLANS.',
        imageUrl: '../../assets/Images/progress.gif'
      });
      this.router.navigate(['/subscription-plan']);
      this.loadingCtrl.hide();
    }else{
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
    }
    

    if(this.myCredit > this.cumulativecredit){
      if (this.urls.length == 0 || this.urls == undefined || this.urls == []) {
        this.loadingCtrl.hide();
        this.update();
      }
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
          if (this.addr == undefined || this.addr == null) {
            this.deallistobj.avlPlace = this.deallistobj.avlPlace.formatted_address;
          } else {
            this.deallistobj.avlPlace = this.addr.formatted_address;
          }
          // this.productId = res._id;        
          this.success = 'Updated successfully!';
          document.getElementById('idView').scrollIntoView();
          setTimeout(() => {
            this.loadingCtrl.show();
            this.router.navigate(['/products']);
            this.loadingCtrl.hide();
          }, 2000);
      
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

      this.cumulativequantity = this.newquantity - this.lastquantity;
      console.log(this.cumulativequantity);

      this.newprice = this.deallistobj.price;
     
    this.cumulativecredit = ((this.cumulativequantity * this.newprice) * 1/100);
    console.log(this.cumulativecredit);
    if(this.myCredit > this.cumulativecredit){
      this.getUser();
    }
  }

  PriceCredit(){

      this.cumulativeprice = this.newprice - this.lastprice;
      console.log(this.cumulativeprice);
   
      this.cumulativecredit = ((this.lastquantity * this.cumulativeprice) * 1/100);

      console.log(this.cumulativecredit);
      if(this.myCredit > this.cumulativecredit){
        this.getUser();
      }
    }

  quantityPriceCredit(){

    if(this.lastquantity < this.newquantity){
      this.cumulativequantity = this.newquantity - this.lastquantity;
      console.log(this.cumulativequantity);
    } 

    if(this.lastprice < this.newprice){
      this.cumulativeprice = this.newprice - this.lastprice;
      console.log(this.cumulativeprice);
    } 

    this.addQtyPrice = (this.cumulativequantity * this.newprice);

    this.addPriceQty = (this.cumulativeprice * this.lastquantity);

    this.addTotal = this.addQtyPrice + this.addPriceQty;

    this.cumulativecredit = ((this.addTotal) * 1/100);

    if(this.myCredit > this.cumulativecredit){
      this.getUser();
    }
  }

  getUser(){
    this._dealsService.getDetails().subscribe(
      res => {
        console.log(res);
        this.loadingCtrl.hide();
        // this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
        console.log(this.currentuserId);
        for (let i = 0; i < res.length; i++) {
          if (this.currentuserId == res[i]._id) {
            this.credits = res[i];
            this.totalCredit = res[i].credits;
            this.creditDetails = res[i].creditDetails
          }
        }
        console.log(this.credits);
        console.log(this.totalCredit);
        console.log(this.creditDetails);
        console.log(this.id);
        for (let i = 0; i < this.creditDetails.length; i++) {
          console.log(this.creditDetails[i].productId);
          if (this.id == this.creditDetails[i].productId) {
            this.credit = this.creditDetails[i];
            this.prdtCredit = this.creditDetails[i].credit;
            this.prdtCreditId = this.creditDetails[i]._id;
          }
        }
        console.log(this.credit);
        this.minusSellerCredit = (this.prdtCredit + this.cumulativecredit);
        console.log(this.minusSellerCredit);

        this.addSellerCredit = (this.totalCredit - this.cumulativecredit);
        console.log(this.addSellerCredit);
        this.updateUser1();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUser1(){
    this.credits.credits = this.addSellerCredit;
    console.log(this.credits.credits);
    this._dealsService.updateCustomer(this.credits, this.currentuserId).subscribe(
      res => {
        console.log(res);
        this.updateUserCreditArrCredit1();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUserCreditArrCredit1(){
    console.log(this.credit);
    this.credit.credit = this.minusSellerCredit;
    this.credit._id = this.prdtCreditId;
    console.log(this.credit._id);
    this._dealsService.updateUserCreditArrCredit(this.credit,this.currentuserId).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  sellerReduceQuantity(){
      console.log(this.newquantity);
    console.log(this.lastprice)
    this.cumulativecredit = ((this.newquantity * this.lastprice) * 1/100);
    console.log(this.cumulativecredit);
    if(this.myCredit > this.cumulativecredit){
      this.getUser1();
    }
  }

  sellerReducePrice(){   
      console.log(this.newprice);
      console.log(this.lastquantity);
    this.cumulativecredit = ((this.newprice * this.lastquantity) * 1/100);
    console.log(this.cumulativecredit);
    if(this.myCredit > this.cumulativecredit){
      this.getUser1();
    }
  }

  sellerQuantityPrice(){

      this.cumulativequantity =  this.newquantity;
      console.log(this.cumulativequantity);

      this.cumulativeprice =  this.newprice;
      console.log(this.cumulativeprice);

    this.cumulativecredit = ((this.cumulativequantity * this.cumulativeprice) * 1/100);
    console.log(this.cumulativecredit);
    if(this.myCredit > this.cumulativecredit){
      this.getUser1();
    }
  }

  getUser1(){
    this._dealsService.getDetails().subscribe(
      res => {
        console.log(res);
        this.loadingCtrl.hide();
        // this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
        for (let i = 0; i < res.length; i++) {
          if (this.currentuserId == res[i]._id) {
            this.credits = res[i];
            this.totalCredit = res[i].credits;
            this.creditDetails = res[i].creditDetails
          }
        }
        for (let i = 0; i < this.creditDetails.length; i++) {
          if (this.id == this.creditDetails[i].productId) {
            this.credit = this.creditDetails[i];
            this.prdtCredit = this.creditDetails[i].credit;
            this.prdtCreditId = this.creditDetails[i]._id;
          }
        }
 console.log(this.credit);
 console.log(this.prdtCredit)
        this.minusSellerCredit = (this.prdtCredit - this.cumulativecredit);
        console.log(this.minusSellerCredit);

        this.addSellerCredit = (this.totalCredit + this.minusSellerCredit);
        console.log(this.addSellerCredit);
        this.updateUser();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUser(){
    this.credits.credits = this.addSellerCredit;
    console.log(this.credits.credits);
    this._dealsService.updateCustomer(this.credits, this.currentuserId).subscribe(
      res => {
        console.log(res);
        this.updateUserCreditArrCredit();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUserCreditArrCredit(){
    this.credit.credit = this.cumulativecredit;
    this.credit._id = this.prdtCreditId;
    console.log(this.credit._id);
    this._dealsService.updateUserCreditArrCredit(this.credit,this.currentuserId).subscribe(
      res => {
        console.log(res);
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
