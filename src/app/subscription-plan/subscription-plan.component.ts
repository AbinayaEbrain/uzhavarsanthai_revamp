import { Component, OnInit } from '@angular/core';
import { DealsService } from '../deals.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.css']
})
export class SubscriptionPlanComponent implements OnInit {
  subscriptionArr: any = [];
  subcriptionData:any = {};
  id:any;
  userId:any;
  subcriptionId:any;
  usersCurrentCredits:any;
  currentCredits:any;

  constructor(private _dealService: DealsService) {}

  ngOnInit() {
    this.getSubscription();
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    console.log(this.userId)
    this.currentUserCredit();
  }

  getSubscription() {
    this._dealService.getSubscription().subscribe(
      res => {
        console.log(res);
        this.subscriptionArr = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  currentUserCredit(){
    this._dealService.getCurrentCredit(this.userId).subscribe(
      res => {
        console.log(res)
        console.log(res.credits)
        this.usersCurrentCredits = res.credits
      },
      err => {
        console.log(err);
      }
    );
  }

  getSingleSubsc(id) {
    this.id = id;
    console.log(this.id);
    this._dealService.getSingleSubscription(id).subscribe(
      data => {
        console.log(data);
        this.subcriptionId = data._id;
        this.subcriptionData = data;
        this.updateSubsc()
      },
      err => {
        console.log(err);
      }
    );
  }

updateSubsc(){
  this.subcriptionData.currentCredits = this.usersCurrentCredits;
  this._dealService
  .updateUserSubscription(this.subcriptionData, this.userId)
  .subscribe(
    data => {
      console.log(data);
      // this.getSubscription();
    },
    err => {
      console.log(err);
    }
  );
}

}
