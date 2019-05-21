import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {
  subscriptionArr: any = [];
  subcriptionData:any = {};
  errMsg : any;
  successMsg :any;
  id:any;
  userId:any;
  subcriptionId:any;
  usersCurrentCredits:any;
  currentCredits:any;

  constructor(private _dealService: DealsService ,   public loadingCtrl: NgxSpinnerService,) {}

  ngOnInit() {
    this.loadingCtrl.show();
    this.getSubscription();
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.userId)
    this.loadingCtrl.hide();
    this.currentUserCredit();
  }

  getSubscription() {
      this.loadingCtrl.show();
    this._dealService.getSubscription().subscribe(
      res => {
        console.log(res);
        this.subscriptionArr = res;
          this.loadingCtrl.hide();
      },
      err => {
        console.log(err);
      }
    );
  }

  currentUserCredit(){
      this.loadingCtrl.show();
    this._dealService.getCurrentCredit(this.userId).subscribe(
      res => {
        console.log(res)
        this.usersCurrentCredits = res.credits
          this.loadingCtrl.hide();
      },
      err => {
        console.log(err);
      }
    );
  }

  getSingleSubsc(id) {
    this.loadingCtrl.show();
    this.id = id;
    console.log(this.id);
    this._dealService.getSingleSubscription(id).subscribe(
      data => {
        console.log(data);
        this.subcriptionId = data._id;
        this.subcriptionData = data;
        this.loadingCtrl.hide();
        this.updateSubsc();
      },
      err => {
        console.log(err);
      }
    );
  }

updateSubsc(){
  this.loadingCtrl.show();
  this.subcriptionData.currentCredits = this.usersCurrentCredits;
  this._dealService
  .updateUserSubscription(this.subcriptionData, this.userId)
  .subscribe(
    data => {
      console.log(data);
      this.loadingCtrl.hide();
      // this.getSubscription();
    },
    err => {
      console.log(err);
    }
  );
}

}
