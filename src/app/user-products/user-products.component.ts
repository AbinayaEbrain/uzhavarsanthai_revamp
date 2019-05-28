import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare var swal: any;

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.css']
})
export class UserProductsComponent implements OnInit {
  myCredit: any;
  credits: any;
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
        let k = 0;
        
        console.log(res);
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < res.length; i++) {
          if ( acntID == res[i].accountId ) {
            this.crdDeals = res._id;
            let arr = [];
            arr = res[i].product
            console.log(arr);
            for(let j = 0 ; j < arr.length;j++){
              if(arr[j].validityTime > CurrentDate){
                this.userDeals[k] = arr[j];
                // this.userDeals[k].category = res[j].category;
                // this.userDeals[k].date = res[j].date;
                this.getPrdtName[l] = this.userDeals[k].name;
                j++;
                k++;
                l++;
              }
            }
          }
        }
        // this.getMultiArray();
        
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
    this.id = JSON.parse(localStorage.getItem('currentUser'))._id;
  }

  getUser(){
    this._dealsService.getDetails().subscribe(
      res => {
        this.loadingCtrl.hide();
        for (let i = 0; i < res.length; i++) {
          if (this.id == res[i]._id) {
            this.credits = res[i];
          }
        }
        console.log(this.credits);
        this.checkSellerCredit();
      },
      err => {
        console.log(err);
      }
    );
  }

  checkSellerCredit(){
    console.log(this.credits)
    this.myCredit = this.credits.credits
    console.log(this.myCredit);
      if (this.myCredit < 1) {
        console.log('No credit')
        swal({
          title: 'You have no credit!',
          text:
            'If you post your product! Please pay MONEY show your PLANS.',
          imageUrl: '../../assets/Images/progress.gif'
        });
        this.router.navigate(['/subscription-plan']);
      } else{
        console.log('You have a credit')
        this.router.navigate(['/post']);
      }  
  }

  getMultiArray(){
    this._dealsService.getMultiPost().subscribe(res =>{
      console.log(res);

      let acntID = JSON.parse(localStorage.getItem('currentUser'))._id;
      let j = 0;
      let CurrentDate = new Date().toISOString();

      for(let i = 0 ; i < res.length ; i++){
        if (
          acntID == res[i].accountId &&
          res[i].validityTime > CurrentDate
        ){
          this.multiPost[j] = res[i];
          j++;
        }
      }
      this.getArray();
    },err =>{
      console.log(err);
    });
  }

  getArray(){
    this.singleMultiArray = this.userDeals.concat(this.multiPost);
    if (this.singleMultiArray.length == 0) {
      this.errMsg = "Still you haven't post any deals";
    }
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
        //this.crdDeals = res;
        let CurrentDate = new Date().toISOString();
        for (let i = 0; i < res.length; i++) {
          if (
            acntID == res[i].accountId &&
            res[i].validityTime < CurrentDate
          ) {
            this.userDeals1[j] = res[i];
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
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteMultiPost(){
    this.id = this.route.snapshot.params['id'];
    this._dealsService.deleteMultiPost(this.id).subscribe(
      res => {
        this.success = 'Deleted successfully!';

        setTimeout(() => {
          // swal.close();
          this.loadingCtrl.show();
          this.router.navigate(['/products']);
          this.loadingCtrl.hide();
        }, 1000);
      },
      err => {
        console.log(err);
      }
    );
  }
}
