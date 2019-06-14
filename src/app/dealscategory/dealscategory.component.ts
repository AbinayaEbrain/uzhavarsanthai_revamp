declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dealscategory',
  templateUrl: './dealscategory.component.html',
  styleUrls: ['./dealscategory.component.css']
})
export class DealscategoryComponent implements OnInit {
  // categoryArr=[{
  //   image:''
  // }];
  categoryArr: any = [];
  errMsg: any;
  //imageSrc = require('../../../server/uploads/photo-1544505995155.jpg');
  imageSrc: any;
  e: any;
  ProductCountArr: any = [];
  count: any;

  constructor(
    private _dealService: DealsService,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.categoryArr.length; i++) {
      this.categoryArr.push(`deal ${i}.0`);
    }
  }

  ngOnInit() {
    document.getElementById('focusDiv').focus();
    this.loadingCtrl.show();
    this.getProductCount();
  }

  getProductCount() {
    this._dealService.getCategoryPrductCount().subscribe(
      data => {
        this.ProductCountArr = data;
        console.log(this.ProductCountArr);
        this.getCategory();
      },
      err => {
        console.log(err);
      }
    );
  }

  getCategory() {
    this._dealService.getCategory().subscribe(
      res => {
        this.categoryArr = res;
        console.log(this.categoryArr);
        for (let i = 0; i < this.categoryArr.length; i++) {
          for (let j = 0; j < this.ProductCountArr.length; j++) {
            if (this.categoryArr[i]._id == this.ProductCountArr[j]._id) {
              this.categoryArr[i].productcount = this.ProductCountArr[
                j
              ].productcount;
            }
          }
        }
        console.log(this.categoryArr);
        this.loadingCtrl.hide();
        if (this.categoryArr.length == 0) {
          this.errMsg = 'No category added';
        }
        // this.imageSrc = require('../../../server/uploads' + this.categoryArr);
        // this.imageSrc = JSON.parse(localStorage.getItem('image_c'))
      },
      err => {
        this.loadingCtrl.hide();
        // this.categoryArr = [];
      }
    );
  }
}
