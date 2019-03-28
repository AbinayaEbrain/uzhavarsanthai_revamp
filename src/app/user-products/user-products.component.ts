import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  crdDeals = [];
  crdDeals1 = [];
  userDeals = [];
  userDeals1 = [];
  getPrdtName = [];
  id: any;
  deal: any;
  errMsg: any;
  errMsg1: any;
  success: any;
  queryString: any;
  p: any;
  d: any;
  errMsg2: any;
  hideProduct = true;
  multiPost = [];
  singleMultiArray = [];

  constructor(
    private _dealsService: DealsService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingCtrl: NgxSpinnerService
  ) {
    for (let i = 1; i <= this.userDeals.length; i++) {
      this.userDeals.push('Angular ${i}.0');
    }
    for (let i = 1; i <= this.userDeals1.length; i++) {
      this.userDeals1.push('Angular ${i}.0');
    }
  }

  ngOnInit() {
    this.loadingCtrl.show();
    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let j = 0;
        let l = 0;
        this.crdDeals = res;
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            acntID == this.crdDeals[i].accountId &&
            this.crdDeals[i].validityTime > CurrentDate
          ) {
            this.userDeals[j] = this.crdDeals[i];
            this.getPrdtName[l] = this.userDeals[j].name;
            j++;
            l++;
          }
        }
        this.getMultiArray();
        if (this.userDeals.length == 0) {
          this.errMsg = "Still you haven't post any deals";
        }
        // for (let j = 0; j < this.userDeals.length; j++) {
        //   if (this.userDeals[j].category == undefined) {
        //     this.errMsg = "Still you haven't post any deals";
        //     document.getElementById('hideEditBtn').style.display = 'none';
        //     document.getElementById('hideDeleteBtn').style.display = 'none';
        //     // document.getElementById('hideSearchDiv').style.display = 'none';
        //     document.getElementById('hide').style.display = 'none';
        //   }
        // }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

  getMultiArray(){
    this._dealsService.getMultiPost().subscribe(res =>{
      this.multiPost = res;
      this.getArray();
    },err =>{
      console.log(err);
    });
  }

  getArray(){
    this.singleMultiArray = this.userDeals.concat(this.multiPost);
  }

  getActiveDeals() {
    this.queryString = '';
  }

  case() {
    this.queryString = this.queryString.toLowerCase();
    for (let i = 0; i < this.getPrdtName.length; i++) {
      if (this.queryString != this.getPrdtName[i]) {
        this.errMsg2 = 'Category is not available';
      }
    }
  }

  getExpiredDeals() {
    this.loadingCtrl.show();
    this.queryString = '';
    this._dealsService.getDeals().subscribe(
      res => {
        this.loadingCtrl.hide();
        let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
        let j = 0;
        this.crdDeals = res;
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < this.crdDeals.length; i++) {
          if (
            acntID == this.crdDeals[i].accountId &&
            this.crdDeals[i].validityTime < CurrentDate
          ) {
            this.userDeals1[j] = this.crdDeals[i];
            j++;
          }
        }
        if (this.userDeals1.length == 0) {
          this.errMsg1 = 'No expired products found';
        }
        // for (let j = 0; j < this.userDeals1.length; j++) {
        //   if (this.userDeals1[j].category == undefined) {
        //     this.loadingCtrl.show();
        //     this.errMsg1 = 'No expired products found';
        //     document.getElementById('hideEditBtn1').style.display = 'none';
        //     document.getElementById('hideDeleteBtn1').style.display = 'none';
        //     // document.getElementById('hideSearchDiv').style.display = 'none';
        //     document.getElementById('hide1').style.display = 'none';
        //     this.loadingCtrl.hide();
        //   }
        // }
      },
      err => {
        this.loadingCtrl.hide();
        console.log(err);
      }
    );
  }

  deleteuser() {
    this.id = this.route.snapshot.params['id'];
    this._dealsService.deletedeal(this.id).subscribe(
      res => {
        this.success = 'Deleted successfully!';

        setTimeout(() => {
          // swal.close();
          this.loadingCtrl.show();
          this.router.navigate(['/products']);
          this.loadingCtrl.hide();
        }, 2000);
      },
      err => {
        console.log(err);
      }
    );
  }
}
