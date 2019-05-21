import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-most-selling-product',
  templateUrl: './most-selling-product.component.html',
  styleUrls: ['./most-selling-product.component.css']
})
export class MostSellingProductComponent implements OnInit {

  productId: any;
  acntID: any;
  crdDeals = [];
  userDeals = [];
  orderrequests: any = [];
  orderrequestsErr = '';


  constructor(
    private _dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) { 
    for (let i = 1; i <= this.orderrequests.length; i++) {
      this.orderrequests.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        this.acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let j = 0;
        let l = 0;
        this.crdDeals = res;
        this.orderrequestsErr = '';
        console.log(this.crdDeals);
        // for (let i = 0; i < this.crdDeals.length; i++) {
        //   if (
        //     this.acntID == this.crdDeals[i].accountId) {
        //     this.userDeals[j] = this.crdDeals[i];
        //     this.productId = this.crdDeals[i]._id;
        //     j++;
        //   }
        // }
        // console.log(this.userDeals);
        // console.log(this.productId);
        this.getOrderRequests();
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

getOrderRequests(){
  console.log(this.crdDeals);
  let j = 0;
  for (let i = 1; i < this.crdDeals.length; i++) {
    console.log(this.crdDeals[i].orderrequests.length);
    if (this.crdDeals[i].orderrequests.length > 2) {
      this.orderrequests[j] = this.crdDeals[i];
      j++;
    }
   
}
console.log(this.orderrequests);
if (this.orderrequests.length == 0) {
  this.orderrequestsErr = 'No product available!';
}
}

}
